import { Fragment, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import MicroLearningRow from "./MicroLearningRow";

export default function ViewMicroLearningModules(props) {

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/course/fetch-all").then((res) => {
      setCourseList(res.data.data);
    });
  }, []);

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Container>
            {Object.keys(courseList).map((index) => {
              return (
                <MicroLearningRow
                  key={courseList[index].id}
                  data={courseList[index]}
                />
              );
            })}
          </Container>
        </Col>
      </Row>
    </div>
  );
}
