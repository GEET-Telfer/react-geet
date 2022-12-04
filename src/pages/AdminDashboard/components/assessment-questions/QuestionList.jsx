import { Row, Container, Col } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import {useState} from "react";

/**
 * Container for question list
 */
export default function QuestionList(props) {
    const { questions, component } = props;

    const [questionList, setQuestionList] = useState(questions); 

    return (
        <Row>
            <Container className={(questionList.length === 0) ? "d-none" : "d-block"}>
                <h1>{component}</h1>
                <Row>
                    <Col sx={6} md={6}><h5>Question</h5></Col>
                    <Col sx={1} md={1}><h5>N/A</h5></Col>
                    <Col sx={1} md={1}><h5>Scoring</h5></Col>
                    <Col sx={12} md={1}></Col>
                    <Col sx={12} md={1}></Col>
                </Row>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionRow
                                key={index}
                                index={index}
                                component={component}
                                question={question}
                                questionList={questionList}
                                setQuestionList={setQuestionList}
                                />
                        );
                    })
                }
            </Container>
        </Row>
    )
}