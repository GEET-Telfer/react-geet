import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import _ from "lodash";
import QuestionList from "./QuestionList";
import QuestionButton from "./QuestionButton";
import { Col, Row } from "react-bootstrap";
import { ProgressCtx } from "../../../context/ProgressContext";
import { useWindowDimensions } from "../../../hooks";
import ScorecardInstruction from "./ScorecardInstruction";

const componentDescriptions = {
  Commitment: `Degree to which the organization's leaders champion inclusive culture and programming. Organizational leaders (e.g., program managers, executives)`,
  Expertise: `Degree to which personnel are knowledgeable about equity, diversity, inclusion and gender influences in venture creation and entrepreneurship education. Program and course personnel`,
  Resources: `Degree to which programming increases access to resources including other support services. Program and course personnel`,
  Design: `Degree to which program design focuses on the needs of diverse learners.  Program and course personnel`,
  Development: `Degree to which program content aligns with the learning needs of diverse participants. Program and course personnel`,
  Delivery: `Degree to which delivery methods respond to the needs of diverse participants. Program and course personnel`,
  Evaluation: `Degree to which feedback (monitoring and evaluation data) informs programs and courses.Program evaluators`,
};

const componentMap = {
  Commitment : "Commitment to Equity, Diversity and Inclusion",
  Expertise : "Gender Expertise",
  Resources : "Access to Resources",
  Design : "Program Design",
  Development : "Program Development",
  Delivery : "Program Delivery",
  Evaluation : "Program Evaluation"
}
/**
 * Entry point for assessment questions, which fetches and saves assessment questions to LocalStoarge
 * The MetaQuestionList is composed of toggle buttons for question list and question lists.
 */
export default function MetaQuestionList(props) {
  const { hasConsent, setComplete } = props;
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

    let flagFetch = true;
    if (loadFromLocalStorage) {
      const data = JSON.parse(loadFromLocalStorage);

      const now = new Date();
      // if localstorage data expires, clear and fetch data from gateway
      if (now.getTime() > data.ttl) {
        localStorage.removeItem("assessment-question");
        console.log("Invalidate localstorage for new data");
      } else {
        setToggleQuestions(["Instruction", ...Object.keys(data.questions)]);
        setQuestions(data.questions);
        console.log("Load from LocalStorage");
        flagFetch = false;
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
            ttl: now.getTime() + 30 * 24 * 60 * 60 * 1000, // ttl: 24 hours
          };

          localStorage.setItem("assessment-question", JSON.stringify(data));
          // setToggleQuestions(Object.keys(data.questions));
          setToggleQuestions(["Instruction", ...Object.keys(data.questions)]);
          setQuestions(data.questions);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [hasConsent]);

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
        ? target_ele[0].classList.add("d-md-none")
        : target_ele[0].classList.remove("d-md-none");
    }
  };

  return (
    <Row
      className="justify-content-md-center mt-3"
      style={{minHeight : "85vh"}}
    >
      <Col
        xs={0}
        sm={0}
        md={{ offset: 2, span: 2 }}
      >
        <QuestionButton
          key={"instruction"}
          description={"Instruction"}
          handleQuestionButton={handleQuestionButton}
        />

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
        <div className="Instruction">
          <ScorecardInstruction />
        </div>
        {Object.keys(questions).map((key) => {
          return (
            <div
              className={`${key} ${key === "Instruction" ? "" : "d-md-none"} `}
              key={key}
            >
              <h2 className={"mb-3"} align="center">
                {componentMap[key]}
              </h2>
              <h6 className={"mb-3"} align="center">
                {componentDescriptions[key]}
              </h6>
              <hr />
              <QuestionList componentName={key} questionList={questions[key]} />
            </div>
          );
        })}
      </Col>
      <Col sm={0} sx={0} md={2}></Col>
    </Row>
  );
}
