import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

export default function CreateQuestion(props) {
  // State
  const [scoring, setScoring] = useState(5);
  const [show, setShow] = useState(false);
  const [component, setComponent] = useState(
    "Commitment to Equity, Diversity and Inclusion"
  );
  const descriptionRef = useRef("");
  const [hasNA, setHasNA] = useState(false);

  const handleCreateQuestion = async () => {
    const data = {
      component: component,
      description: descriptionRef.current,
      scoring: scoring,
      hasNA: hasNA,
    };


    await axios
      .post(
        `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/assessment/create`,
        data
      )
      .then(() => {
        setShow(true);
        document.getElementById("create-question-form").reset();
        setComponent("Commitment to Equity, Diversity and Inclusion");
        setScoring(5);
        setHasNA(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // componentRef.current = event.target.value
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
              <Form.Label>Question Component</Form.Label>
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
              <Form.Label>Question Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
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
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Switch
                onChange={(event) => setHasNA(!hasNA)}
                checked={hasNA}
                id="switch-has-na"
                label="Has N/A"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
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
