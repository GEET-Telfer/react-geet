import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AdminQuestionCtx } from "../../../../context/AdminQuestionContext";
import ConfirmationModal from "./ConfirmationModal";
import QuestionModal from "./QuestionModal";

/**
 * Detailed Question row with question, NA, scoring and action buttons
 */
export default function QuestionRow(props) {
  const { question, component, questionList, setQuestionList } = props;

  //Context
  const { setShowDelete } = useContext(AdminQuestionCtx);

  // State
  const [show, setShow] = useState(true); // toggle variable to display current QuestionRow
  const [confirm, setConfirm] = useState(false); // confirmation on Deleting the current QuestionRow

  // Modal Toggle
  const [modalShow, setModalShow] = useState(false); // toggle update-question modal
  const handleModalClose = () => setModalShow(false); // close update-question modal
  const handleModalShow = () => setModalShow(true); // open update-question modal

  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // toggle confirm-on-delete modal
  const handleQuestionDeletion = () => setShowConfirmationModal(true); // open confirm-on-delete modal

  // submit request to delete the questionRow after admin cnofirms on deletion.
  useEffect(() => {
    if (confirm === true) {
      axios
        .post(
          `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/assessment/delete`,
          {
            id: question.id,
          }
        )
        .then(async (res) => {
          if (res.status === 200) {
            let newQuestionList = questionList.filter(
              (obj) => obj.id !== question.id
            );
            setQuestionList(newQuestionList); // delete current question row from question list
            setShow(false);
            setShowDelete(true);
          } else {
            alert("Request didn't go through");
          }
        })
        .catch((err) => {
          // console.error(err);
          alert(`Error: ${err?.response?.data}`);
        });
    }
  }, [confirm]);

  return (
    <div className={show ? "d-block" : "d-none"}>
      <QuestionModal
        component={component}
        question={question}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalClose={handleModalClose}
      />

      <ConfirmationModal
        setConfirm={setConfirm}
        modalShow={showConfirmationModal}
        setModalShow={setShowConfirmationModal}
      />

      <Row>
        <Col sx={6} md={6}>
          {question.description}
        </Col>
        {/* <Col sx={1} md={1}>
          {question.has_NA == true ? "true" : "false"}
        </Col>
        <Col sx={1} md={1}>
          {question.scoring}
        </Col> */}
        <Col sx={6} md={2}>
          {question.question_status === "draft" ? "Draft" : question.question_status==="under_review" ? "Under Review" : "Publish"}
        </Col>

        <Col sx={12} md={2}>
          <Button variant={"primary"} onClick={handleModalShow}>
            UPDATE
          </Button>
        </Col>
        <Col sx={12} md={2}>
          <Button
            variant={"danger"}
            onClick={handleQuestionDeletion}
            // style={{ marginLeft: 20 }}
          >
            DELETE
          </Button>
        </Col>
      </Row>
      <hr />
    </div>
  );
}
