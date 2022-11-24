import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';
import QuestionList from './QuestionList';
import QuestionButton from './QuestionButton';
import { Col, Container, Row } from 'react-bootstrap';
import { ProgressCtx } from '../../../context/ProgressContext';

export default function MetaQuestionList(props) {
    const { hasConsent, hasComplete, setComplete } = props;

    const [cookies, setCookie] = useCookies();

    const toShow = (visibility) => visibility ? "show" : "hide";

    const { progress } = useContext(ProgressCtx);

    // useState
    const [questions, setQuestions] = useState([]);
    const [toggleQuestions, setToggleQuestions] = useState([]);

    // useRef
    const questionSizeRef = useRef(0);

    useEffect(() => {
        // check cookie
        const loadFromCookies = Object.keys(cookies)
            .filter((key) => key.startsWith("component"))
            .reduce((res, key) => {
                let key_ = key.replace("component-", "");
                res[key_] = cookies[key];
                return res;
            }, {});
        // if component cookies have content, load the question lists from cookie
        if (Object.keys(loadFromCookies).length !== 0) {
            setToggleQuestions(Object.keys(loadFromCookies));
            setQuestions(loadFromCookies);
            console.log("Load from cookie");
            return;
        }

        // fetch assessment questions from redis server
        axios.get(`http://localhost:5005/assessment/fetch-all`)
            .then((res) => {
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

    useEffect(() => {
        let count = 0;
        _.forEach(questions, (questionArr) => count += questionArr.length);
        questionSizeRef.current = count;

        // if the user answered all the questions, 
        if (Object.keys(progress).length === questionSizeRef.current) {
            // setShow("hide");
            setComplete(true);
        }
    }, [questions, progress]);

    useEffect(() => {
        // check if the assessment is completed
        setComplete(Object.keys(progress).length === questionSizeRef.current);
    }, [hasComplete]);

    useEffect(() => {
        console.log({ hasConsent });
    }, [hasConsent]);

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

    return (
        <div className={toShow(hasConsent & hasComplete)} >
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
        </div>
    )
}