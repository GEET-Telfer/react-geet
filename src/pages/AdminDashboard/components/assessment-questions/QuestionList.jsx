import { Fragment, useEffect } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import QuestionRow from "./QuestionRow";


export default function QuestionList(props) {
    const { questions } = props;

    return (
        <Row>
            <Container className={(questions.length === 0) ? "d-none" : "d-block"}>
                <Row>
                    <Col sx={1} md={1}><h5>Index</h5></Col>
                    <Col sx={6} md={6}><h5>Question</h5></Col>
                    <Col sx={1} md={1}><h5>N/A</h5></Col>
                    <Col sx={1} md={1}><h5>Scoring</h5></Col>
                </Row>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionRow
                                key={index}
                                index={index}
                                question={question} />
                        );
                    })
                }
            </Container>
        </Row>
    )
}