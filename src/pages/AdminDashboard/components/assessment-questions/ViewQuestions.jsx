import { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import QuestionList from './QuestionList';
import { AdminQuestionCtx } from '../../../../context/AdminQuestionContext';

export default function ViewQuestions(props) {

    const [questions, setQuestions] = useState({});
    
    const { needUpdate, showDelete, setShowDelete, showEdit, setShowEdit } = useContext(AdminQuestionCtx);

    const fetchAllQuestions = async () => {
        return await axios.get(`http://localhost:5005/assessment/fetch-all`);
    }

    useEffect(() => {
        fetchAllQuestions()
            .then((res) => {
                const data = _.groupBy(res.data.data, 'component_abbrev');
                // trim duplicated values in the questions objects
                // for (const key in data) {
                //     data[key] = data[key].map((question) => {
                //         question = _.omit(question, ['component', 'component_abbrev']);
                //         return question;
                //     })
                // }
                setQuestions(data);
                console.log("Questions fetched");
            })
            .catch((err) => {
                console.error(err);
            })
    }, [needUpdate]);

    return (
        <div>
            <Row>
                <ToastContainer className="p-3" position={'middle-center'}>
                    <Toast onClose={() => setShowEdit(false)} show={showEdit} delay={3000} autohide>
                        <Toast.Body>Assessment Question Is Edited</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Row>
            <Row>
                <ToastContainer className="p-3" position={'middle-center'}>
                    <Toast onClose={() => setShowDelete(false)} show={showDelete} delay={3000} autohide>
                        <Toast.Body>Assessment Question Is Deleted</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Row>
            <Row>
                <Col xs={12}>
                    <Container>
                        {
                            Object.keys(questions).map((component) => {
                                return (
                                    <Fragment key={component}>
                                        <h1>{component}</h1>
                                        <QuestionList component={component} questions={questions[component]} />
                                    </Fragment>
                                );
                            })
                        }
                    </Container>
                </Col>
            </Row>
        </div>

    )
}