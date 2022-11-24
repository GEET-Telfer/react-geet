import { Fragment, useEffect, useContext, useRef } from 'react';
import { ProgressCtx } from '../../../context/ProgressContext';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import axios from 'axios';

export default function Result(props) {

    const { hasConsent, hasComplete, setComplete } = props;

    const { progress, calComponentScore, calOverallSore, mapScoreToLabel, clearProgress } = useContext(ProgressCtx);

    const userEmailRef = useRef("");

    useEffect(() => {
        console.log({ from: "result", hasComplete });
    }, [hasComplete]);

    const handleUserResponseSubmission = async() => {
        let user_response = _.groupBy(progress, 'component');
        // user_response = _.groupBy(progress, 'component');
        console.log(user_response);
        const scores = calComponentScore(progress);
        const overallScore = calOverallSore(scores);
        const score = overallScore.sum / overallScore.size;

        let report = {};
        report.overall = mapScoreToLabel(score);
        for (let key in scores) {
            report[key] = mapScoreToLabel(scores[key]);
        }

        const data = {
            user_email: userEmailRef.current.value,
            user_response: JSON.stringify(user_response),
            score: score.toFixed(2),
            report: JSON.stringify(report)
        };

        await axios.post("http://localhost:5005/assessment/submit-user-response", data)
            .then((res) => {
                console.log(res);
                // clearProgress();
            }).catch(console.error);

        userEmailRef.current.value = "";
    }

    return (
        <>
            {
                hasComplete ?
                <Row className="justify-content-md-center">
                    <Col>
                        <h1 align="center">Feedback</h1>
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
                </Row>
                : null
            }
        </>
    )
}