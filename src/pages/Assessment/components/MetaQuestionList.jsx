import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';
import QuestionList from './QuestionList';
import QuestionButton from './QuestionButton';
import { Col, Container, Row } from 'react-bootstrap';
import { ProgressCtx } from '../../../context/ProgressContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MetaQuestionList(props) {
    const { visibility } = props;

    const toShow = (visibility) => visibility ? "show" : "hide";

    const { progress, calComponentScore, calOverallSore, mapScoreToLabel, clearProgress } = useContext(ProgressCtx);

    const [show, setShow] = useState(toShow(visibility));

    const [questions, setQuestions] = useState([]);
    const questionSizeRef = useRef(0);
    const userEmailRef = useRef("");

    const [toggleQuestions, setToggleQuestions] = useState([]);

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        // check cookie
        // const loadFromCookies = Object.keys(cookies)
        //     .filter((key) => key.startsWith("component"))
        //     .reduce((res, key) => {
        //         let key_ = key.replace("component-", "");
        //         res[key_] = cookies[key];
        //         return res;
        //     }, {});
        // // if component cookies have content, load the question lists from cookie
        // if (Object.keys(loadFromCookies).length !== 0) {
        //     setToggleQuestions(Object.keys(loadFromCookies));
        //     setQuestions(loadFromCookies);
        //     console.log("Load from cookie");
        //     return;
        // }

        // fetch assessment questions from redis server
        const fetchAllQuestions = async () => await axios.get(`http://localhost:5005/assessment/fetch-all`);

        fetchAllQuestions().then((res) => {
            const questions = _.groupBy(res.data.data, 'component_abbrev');
            // trim duplicated values in the questions objects
            for (const key in questions) {
                questions[key] = questions[key].map((question) => {
                    question = _.omit(question, ['component', 'component_abbrev']);
                    return question;
                })
            }
            // set cookies for each questions with ttl of 1 minute.
            for (const key in questions) {
                setCookie(`component-${key}`, JSON.stringify(questions[key]),
                    {
                        path: "/",
                        expires: new Date(Date.now() + 30 * 60 * 1000),
                        httpOnly: false
                    });
            }
            setToggleQuestions(Object.keys(questions));
            setQuestions(questions);
        })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleQuestionButton = (event) => {
        const id = event.target.id;
        // hide question list with different className than the clicking button
        for (const key of toggleQuestions) {
            const target_ele = document.getElementsByClassName(key);
            (key !== id) ?
                target_ele[0].classList.add('hide') :
                target_ele[0].classList.remove('hide')
        }
    }

    useEffect(() => {
        let count = 0;
        _.forEach(questions, (questionArr) => count += questionArr.length);
        questionSizeRef.current = count;

        // if the user answered all the questions, 
        if (Object.keys(progress).length === questionSizeRef.current) {
            // setShow("hide");
        }
    }, [questions, progress])

    const handleUserResponseSubmission = () => {
        // console.log(progress);

        let user_response = {};

        user_response = _.groupBy(progress, 'component');

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


        axios.post("http://localhost:5005/assessment/submit-user-response", data)
            .then((res) => {
                console.log(res);
                // clearProgress();
            }).catch(console.error);
    }
    return (
        <Container className={show} >
            <Row className="justify-content-md-center">
                <Col md={{ offset: 2, span: 2 }}>
                    {
                        Object.keys(questions).map((component) => {
                            return <QuestionButton key={component} description={component} handleQuestionButton={handleQuestionButton} />
                        })
                    }
                </Col>
                <Col>
                    {
                        Object.keys(questions).map((key) => {
                            return (
                                <div className={`${key} ${key === "Commitment" ? null : "hide"}`} key={key}>
                                    <h1 className={"mb-3"} align="center">{key}</h1>
                                    <QuestionList componentName={key} questionList={questions[key]} />
                                </div>
                            );
                        })
                    }
                </Col>
            </Row>
            {
                show === "show" &&
                <Row className="justify-content-md-center">
                    <Col md={{ offset: 1, span: 2 }} />
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
            }
        </Container>
    )
}