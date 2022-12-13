import { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import MicroLearningRow from "./MicroLearningRow";
import { AdminQuestionCtx } from '../../../../context/AdminQuestionContext';

/**
 * Entry point for viewing micro-learning modules
 */
export default function ViewMicroLearningModules(props) {

  const [courseList, setCourseList] = useState([]);

  const { needUpdate } = useContext(AdminQuestionCtx); // flag variable for fetching updated data

  useEffect(() => {
    // fetch micro-learning resources
    axios.get(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/fetch-all`).then((res) => {
      setCourseList(res.data.data);
    });
  }, [needUpdate]);

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
