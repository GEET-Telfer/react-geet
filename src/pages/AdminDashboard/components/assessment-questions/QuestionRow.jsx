import axios from "axios";
import { useState, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AdminQuestionCtx } from "../../../../context/AdminQuestionContext";
import QuestionModal from "./QuestionModal";

export default function QuestionRow(props) {
  const { index, question, component } = props;

  const [show, setShow] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const { needUpdate, setNeedUpdate, setShowDelete } =
    useContext(AdminQuestionCtx);

  const handleQuestionDeletion = async () => {
    await axios
      .post(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/assessment/delete`, {
        id: question.id,
      })
      .then(async () => {
        alert("Question Deleted")
        setShow(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={show ? "d-block" : "d-none"}>
      <QuestionModal
        component={component}
        question={question}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalClose={handleModalClose}
      />

      <Row>
        <Col sx={1} md={1}>
          {index + 1}
        </Col>
        <Col sx={6} md={6}>
          {question.description}
        </Col>
        <Col sx={1} md={1}>
          {question.has_NA == true ? "true" : "false"}
        </Col>
        <Col sx={1} md={1}>
          {question.scoring}
        </Col>
        <Col sx={1} md={1}>
          <Button variant={"primary"} onClick={handleModalShow}>
            UPDATE
          </Button>
        </Col>
        <Col sx={1} md={1}>
          <Button
            variant={"danger"}
            onClick={handleQuestionDeletion}
            style={{ marginLeft: 15 }}
          >
            DELETE
          </Button>
        </Col>
      </Row>
      <hr />
    </div>
  );
}
