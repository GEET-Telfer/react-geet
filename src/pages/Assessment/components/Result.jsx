import { useContext, useRef, useState } from 'react';
import { ProgressCtx } from '../../../context/ProgressContext';
import { Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import axios from 'axios';
import {useWindowDimensions} from "../../../hooks";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Result(props) {

    const { hasConsent, hasComplete, setComplete } = props;
    const { width } = useWindowDimensions(); // get window width

    // LocalStorage handler for User Progress and Report
    const { progress, calComponentScore, calOverallSore, mapScoreToLabel, clearProgress } = useContext(ProgressCtx);

    // report data
    const scores = calComponentScore(progress);
    const overallScoreArr = calOverallSore(scores);
    const score = overallScoreArr.sum / overallScoreArr.size;
    let report = { Overall : mapScoreToLabel(overallScoreArr) };
    for (let key in scores) { report[key] =  mapScoreToLabel(scores[key]) }

    // Ref
    const userEmailRef = useRef("");

    // State
    const [showFeedbackSent, setShowFeedbackSent] = useState(false);

    /**
     * submit user response, score and report to endpoint
     */
    const handleUserResponseSubmission = async () => {
        let user_response = _.groupBy(progress, 'component');

        const data = {
            user_email: userEmailRef.current.value,
            user_response: JSON.stringify(user_response),
            score: score.toFixed(2),
            report: JSON.stringify(report)
        };

        await axios.post(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/assessment/submit-user-response`, data)
            .then((res) => {
                if(res.status === 200) {
                    setShowFeedbackSent(true);
                } 
            }).catch(console.error);

        userEmailRef.current.value = "";
    }

    /**
     * Clear user progress and replace result component with assessment component
     */
    const handleUserResponseReset = () => {
        clearProgress();
        setComplete(false);
    }

    return (
        <Row xs={12} sm={12} 
        style={{marginLeft: 0.2 * width, width : 0.45 * width, marginRight: 0.2 * width}}> 
            <ToastContainer className="p-3" position={"middle-center"}>
                <Toast
                    onClose={() => setShowFeedbackSent(false)}
                    show={showFeedbackSent}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>Feedback sent</Toast.Body>
                </Toast>
            </ToastContainer>
            {
                hasConsent && hasComplete &&
                <Col>
                    <h1>Feedback</h1>
                    {
                        Object.keys(report).map((key) => {
                            // scores
                            const score = key === 'Overall' ? overallScoreArr.sum : scores[key].sum;
                            const numQuestions = key === "Overall" ? overallScoreArr.size : scores[key].size;
                            const now = (100 * score / (5 * numQuestions)).toFixed(2);
                            const status = report[key] === "Low" ? "danger" : 
                            report[key] === "Moderate" ? "warning" : "success";
                            return (
                            <div key={key}>
                                {key} : {report[key]} Performance
                                <ProgressBar animated striped variant={status} label={`${now}%`} now={now} />
                            </div>);
                        })
                    }
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" ref={userEmailRef} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Please fill your email to receive feedback.
                        </Form.Text>
                    </Form.Group>
                    <Row>
                        <Col xs={12} sm={12} md={{span : 2}}>
                            <Button
                                variant={"blank"}
                                className={"btn-user-response"}
                                onClick={handleUserResponseReset}>
                                Reset
                            </Button>
                        </Col>

                        <Col xs={12} sm={12} md={{offset : 8, span : 2}}>
                            <Button
                                variant={"blank"}
                                className={"btn-user-response"}
                                onClick={handleUserResponseSubmission}>
                                Submit
                            </Button>
                        </Col>
                    </Row>

                </Col>
            }
        </Row>
    )
}