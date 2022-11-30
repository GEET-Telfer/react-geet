import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import _ from "lodash";
import QuestionList from "./QuestionList";
import QuestionButton from "./QuestionButton";
import { Col, Row } from "react-bootstrap";
import { ProgressCtx } from "../../../context/ProgressContext";
import { useWindowDimensions } from "../../../hooks";

export default function MetaQuestionList(props) {
  const { setComplete } = props;
  const { width } = useWindowDimensions();

  // Context
  const { progress } = useContext(ProgressCtx);

  // State
  const [questions, setQuestions] = useState({}); // question collection: [{componentA: {data}, componentB: {data}}]
  const [toggleQuestions, setToggleQuestions] = useState({}); // componentLists

  // Ref
  const questionSizeRef = useRef(0);

  useEffect(() => {
    const loadFromLocalStorage = localStorage.getItem("assessment-question");

    let flagFetch = false;
    if (loadFromLocalStorage) {
      const data = JSON.parse(loadFromLocalStorage);

      const now = new Date();
      // if localstorage data expires, clear and fetch data from gateway
      if (now.getTime() > data.ttl) {
        localStorage.removeItem("assessment-question");
        console.log("Invalidate localstorage for new data");
        flagFetch = true;
      } else {
        setToggleQuestions(Object.keys(data.questions));
        setQuestions(data.questions);
        console.log("Load from LocalStorage");
        return;
      }
    }
    if (flagFetch) {
      axios
        .get(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/assessment/fetch-all`)
        .then((res) => {
          const questions = _.groupBy(res.data.data, "component_abbrev");
          // trim duplicated values in the questions objects
          for (const key in questions) {
            questions[key] = questions[key].map((question) => {
              question = _.omit(question, ["component", "component_abbrev"]);
              return question;
            });
          }

          const now = new Date();
          const data = {
            questions,
            ttl: now.getTime() + 30 * 60 * 1000, // ttl: 30 min
          };

          localStorage.setItem("assessment-question", JSON.stringify(data));
          setToggleQuestions(Object.keys(data.questions));
          setQuestions(data.questions);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    let count = 0;
    _.forEach(questions, (questionArr) => (count += questionArr.length));
    questionSizeRef.current = count;

    // if the user answered all the questions,
    if (
      questionSizeRef.current !== 0 &&
      Object.keys(progress).length === questionSizeRef.current
    ) {
      setComplete(true);
    }
  }, [questions, progress]);

  const handleQuestionButton = (event) => {
    const id = event.target.id;
    // hide question list with different className than the clicking button
    for (const key of toggleQuestions) {
      const target_ele = document.getElementsByClassName(key);
      key !== id
        ? target_ele[0].classList.add("hide")
        : target_ele[0].classList.remove("hide");
    }
  };

  return (
    <Row
      className="justify-content-md-center mt-3"
      style={{ width: 0.8 * width }}
    >
      <Col
        sm={{ offset: 2, span: 2 }}
        md={{ offset: 2, span: 2 }}
        lg={{ offset: 2, span: 2 }}
      >
        {Object.keys(questions).map((component) => {
          return (
            <QuestionButton
              key={component}
              description={component}
              handleQuestionButton={handleQuestionButton}
            />
          );
        })}
      </Col>
      <Col>
        {Object.keys(questions).map((key) => {
          return (
            <div
              className={`${key} ${key === "Commitment" ? "" : "hide"} `}
              key={key}
            >
              <h1 className={"mb-3"} align="center">
                {key}
              </h1>
              <QuestionList componentName={key} questionList={questions[key]} />
            </div>
          );
        })}
      </Col>
    </Row>
  );
}
