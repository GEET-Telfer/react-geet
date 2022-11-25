import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import _ from 'lodash';
import QuestionList from './QuestionList';
import QuestionButton from './QuestionButton';
import { Col, Row } from 'react-bootstrap';
import { ProgressCtx } from '../../../context/ProgressContext';

export default function MetaQuestionList(props) {
    const { hasConsent, hasComplete, setComplete } = props;

    const toShow = (visibility) => visibility ? "show" : "hide";

    // Context
    const { progress } = useContext(ProgressCtx);

    // State
    const [questions, setQuestions] = useState({}); // question collection: [{componentA: {data}, componentB: {data}}]
    const [toggleQuestions, setToggleQuestions] = useState({}); // componentLists
    const [show, setShow] = useState(toShow(hasConsent && !hasComplete)); // toggle attribute to display MetaQuestionList

    // Ref
    const questionSizeRef = useRef(0);

    useEffect(() => {
        const loadFromLocalStorage = localStorage.getItem('assessment-question');

        if (loadFromLocalStorage) {
            const data = JSON.parse(loadFromLocalStorage);

            const now = new Date();
            // if localstorage data expires, clear and fetch data from gateway
            if (now.getTime() > data.ttl) {
                localStorage.removeItem('assessment-question');
                console.log("Invalidate localstorage for new data");
            } else {
                setToggleQuestions(Object.keys(data.questions));
                setQuestions(data.questions);
                console.log("Load from LocalStorage");
                return;
            }
        }

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

                const now = new Date()
                const data = {
                    questions,
                    ttl: now.getTime() + 30 * 60 * 1000  // ttl: 30 min
                };

                localStorage.setItem('assessment-question', JSON.stringify(data));
                setToggleQuestions(Object.keys(data.questions));
                setQuestions(data.questions);
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
        if (questionSizeRef.current !== 0 && Object.keys(progress).length === questionSizeRef.current) {
            setShow("hide");
            setComplete(true);
        }
    }, [questions, progress]);

    useEffect(() => {
        // check if the assessment is completed
        setComplete(Object.keys(progress).length === questionSizeRef.current);
    }, [hasComplete]);

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
        <div className={show} >
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