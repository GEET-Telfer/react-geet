import { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import MicroLearningSnippet from "./components/MicroLearningSnippet";
import { useWindowDimensions } from "../../hooks";
import AssessmentSnippet from "./components/AssessmentSnippet";
import Intro from "./components/Intro";
import "./styles/styles.css";
import Header from "../../components/Header";
import geetLogo from "../../assets/geet-logo-large.png";
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

  const breadcrumbItems = [
    { title: "Home", link: process.env.REACT_APP_HOST },
  ];

  return (
    <Fragment>
      <Header breadcrumbItems={breadcrumbItems} title={"MicroLearning"} />

      <img className={"sticky-icon"} src={geetLogo} alt="GEET LOGO" />

      <Container fluid="true">
        <Intro />

        {Object.keys(courseList).map((index) => {
          return (
            <MicroLearningSnippet
              key={courseList[index].uuid}
              data={courseList[index]}
            />
          );
        })}

        <AssessmentSnippet />
      </Container>
    </Fragment>
  );
}
