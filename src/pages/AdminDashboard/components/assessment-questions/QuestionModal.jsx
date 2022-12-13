import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
// import RangeSlider from "react-bootstrap-range-slider";
import { AdminQuestionCtx } from "../../../../context/AdminQuestionContext";

/**
 * A pop-up modal for updating existing question.
 */
export default function QuestionModal(props) {
  const { modalShow, setModalShow, handleModalClose, question } = props;
  const { id, component, description, has_NA, scoring, uuid, question_status } = question;

  // Context
  const { needUpdate, setNeedUpdate, setShowEdit } =
    useContext(AdminQuestionCtx);

  // State
  const [scoring_, setScoring] = useState(scoring);
  const [hasNA, setHasNA] = useState(has_NA === "1");
  const [questionStatus, setQuestionStatus] = useState(question_status);

  // Ref
  const descriptionRef = useRef(description);

  const handleQuestionUpdate = () => {
    // collect updated question data
    const data = {
      id: id,
      uuid : uuid,
      component: component,
      description: descriptionRef.current,
      scoring: scoring_,
      hasNA: hasNA,
      question_status : questionStatus
    };
    // submit update request
    axios
      .post(
        `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/assessment/update`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully updated");
          setNeedUpdate(!needUpdate); // invoke question list re-rendering
          setShowEdit(true);
          setModalShow(false);
        } else {
          alert("Request didn't go through, please check your inputs");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Question Component</Form.Label>
              <Form.Control disabled as={"select"}>
                <option value={component}>{component}</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            value={descriptionRef}
            onChange={(event) => (descriptionRef.current = event.target.value)}
          >
            <Col>
              <Form.Label>Statement</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={descriptionRef.current}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Statement Status</Form.Label>
              <Form.Control
                as={"select"}
                defaultValue={questionStatus}
                onChange={(event) => {
                  setQuestionStatus(event.target.value);
                }}
              >
                <option value="draft">Draft</option>
                <option value="under_review">Under Review</option>
                <option value="publish">Publish</option>
              </Form.Control>
            </Col>
          </Form.Group>
          {/* temporarily hide point scale as 5-point scale is fixated */}
          {/* <Form.Group as={Row} className="mb-3">
            <Col xs="12">
              <Form.Label> Scoring </Form.Label>
              <RangeSlider
                value={scoring_}
                onChange={(e) => setScoring(e.target.value)}
                step={2}
                min={1}
                max={11}
                tooltip={"on"}
                tooltipPlacement={"top"}
              />
            </Col>
          </Form.Group> */}

          {/* temporarily hide hasNA as No N/A user response will be taken in action */}
          {/* <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Switch
                onChange={(event) => setHasNA(!hasNA)}
                checked={hasNA}
                id="switch-has-na"
                label="Has N/A"
              />
            </Col>
          </Form.Group> */}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleQuestionUpdate}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
