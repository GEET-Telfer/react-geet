import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import RangeSlider from "react-bootstrap-range-slider";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import axios from "axios";

/**
 * Assessment question creation component
 */
export default function CreateQuestion(props) {
  // State
  const [scoring, setScoring] = useState(5); // default number of choices
  const [show, setShow] = useState(false); // toggle toast notification on successfully creating a question

  const [component, setComponent] = useState(
    "Commitment to Equity, Diversity and Inclusion"
  ); // default component category
  const [hasNA, setHasNA] = useState(false); // default has Not Avaliable
  const [questionStatus, setQuestionStatus] = useState("draft");

  // Ref
  const descriptionRef = useRef("");

  // submit request to create a question
  const handleCreateQuestion = async () => {
    const data = {
      component: component,
      description: descriptionRef.current,
      scoring: scoring,
      hasNA: hasNA,
      question_status : questionStatus
    };

    await axios
      .post(
        `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/assessment/create`,
        data
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShow(true);
          document.getElementById("create-question-form").reset();
          setComponent("Commitment to Equity, Diversity and Inclusion");
          setScoring(5);
          setHasNA(false);
          setQuestionStatus("draft");
        } else {
          alert("Request didn't go through, please check your inputs");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Row>
        <ToastContainer className="p-3" position={"middle-center"}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Body>Assessment Question Is Added</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>
      <Row>
        <Form id="create-question-form">
          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Component</Form.Label>
              <Form.Control
                as={"select"}
                onChange={(event) => {
                  setComponent(event.target.value);
                }}
              >
                <option value="Commitment to Equity, Diversity and Inclusion">
                  Commitment to Equity, Diversity and Inclusion
                </option>
                <option value="Gender Expertise">Gender Expertise</option>
                <option value="Access to Resources">Access to Resources</option>
                <option value="Program Design">Program Design</option>
                <option value="Program Development">Program Development</option>
                <option value="Program Delivery">Program Delivery</option>
                <option value="Program Evaluation">Program Evaluation</option>
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
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Statement Status</Form.Label>
              <Form.Control
                as={"select"}
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
                value={scoring}
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
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button variant="primary" onClick={handleCreateQuestion}>
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}
