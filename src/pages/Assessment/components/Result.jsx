import { useContext, useRef } from 'react';
import { ProgressCtx } from '../../../context/ProgressContext';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import axios from 'axios';
import {useWindowDimensions} from "../../../hooks";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Result(props) {

    const { hasConsent, hasComplete, setComplete } = props;
    const { width } = useWindowDimensions();

    const { progress, calComponentScore, calOverallSore, mapScoreToLabel, clearProgress } = useContext(ProgressCtx);

    // report
    const scores = calComponentScore(progress);
    const overallScore = calOverallSore(scores);
    const score = overallScore.sum / overallScore.size;
    let report = {overall : mapScoreToLabel(score)};
    for (let key in scores) report[key] = mapScoreToLabel(scores[key]);

    // Ref
    const userEmailRef = useRef("");

    // useEffect(() => {
    //     console.log(scores);
    // }, []);

    const handleUserResponseSubmission = async () => {
        let user_response = _.groupBy(progress, 'component');
        console.log(user_response);

        const data = {
            user_email: userEmailRef.current.value,
            user_response: JSON.stringify(user_response),
            score: score.toFixed(2),
            report: JSON.stringify(report)
        };

        await axios.post("http://localhost:5005/assessment/submit-user-response", data)
            .then((res) => {
                console.log(res);
                // setComplete(false)
                // clearProgress();
            }).catch(console.error);

        userEmailRef.current.value = "";
    }

    return (
        //todo: fix responsive layout
        <Row xs={12} sm={12} 
        style={{marginLeft: 0.2 * width, width : 0.45 * width, marginRight: 0.2 * width}}> 
            {
                hasConsent && hasComplete &&
                <Col>
                    <h1>Feedback</h1>
                    {
                        Object.keys(report).map((key) => {
                            // scores
                            const score = key === 'overall' ? overallScore : scores[key];
                            const meanScore = score?.sum / score?.size;
                            const now = (100 * meanScore / (key === 'overall' ? 7 : 5)).toFixed(2);
                            const status = mapScoreToLabel(score) === "WARNING" ? "danger" : 
                            mapScoreToLabel(score) === "OK" ? "warning" : "success";
                            return (
                            <p key={key}>
                                {key} : {report[key]}
                                <ProgressBar animated striped variant={status} label={`${now}%`} now={now} />
                            </p>);
                        })
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" ref={userEmailRef} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Please fill your email to receive feedback.
                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant={"blank"}
                        className={"btn-user-response float-end"}
                        onClick={handleUserResponseSubmission}>
                        Submit
                    </Button>
                </Col>
            }
        </Row>
    )
}