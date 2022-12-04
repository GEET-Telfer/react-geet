import { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import MicroLearningSnippet from "./components/MicroLearningSnippet";
import { useWindowDimensions } from "../../hooks";
import AssessmentSnippet from "./components/AssessmentSnippet";
import Intro from "./components/Intro";
import "./styles/styles.css";

/**
 * MicroLearning Directory Entry point
 */
export default function MicroLearningList(props) {
  const [courseList, setCourseList] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/course/fetch-all`)
      .then((res) => {
        setCourseList(res.data.data);
      });
  }, []);

  return (
    <Container fluid="true" style={{ width: width * 0.9 }}>
      <Intro />

      {Object.keys(courseList).map((index) => {
        return (
          <MicroLearningSnippet
            key={courseList[index].id}
            data={courseList[index]}
          />
        );
      })}

      <AssessmentSnippet />
    </Container>
  );
}
