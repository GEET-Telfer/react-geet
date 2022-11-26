import { useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export default function CreateQuestion(props) {
    const { activeKey, tag } = props;

    // State
    const [scoring, setScoring] = useState(5);
    const [show, setShow] = useState(false);

    // Ref
    const componentRef = useRef("Commitment to Equity, Diversity and Inclusion");
    const descriptionRef = useRef("");
    const hasNARef = useRef(false);

    const handleCreateQuestion = (async () => {
        const data = {
            component: componentRef.current,
            description: descriptionRef.current,
            scoring: scoring,
            hasNA: hasNARef.current.value === 'on' ? 1 : 0
        };

        await axios.post("/wp-json/assessment/v1/add", data)
            .then(() => {
                setShow(true);
            })
            .then(() => {
                // remove redis cache for questions
                axios.post("http://localhost:5005/admin/assessment/delete");
            })
            .catch((err) => {
                console.error(err);
            });
    });

    // componentRef.current = event.target.value
    return (
        <div className={(activeKey === tag) ? "d-block" : "d-none"}>
            <Row>
                <ToastContainer className="p-3" position={'middle-center'}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>Assessment Question Is Added</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Row>
            <Row>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col xs={12}>
                            <Form.Label>Question Component</Form.Label>
                            <Form.Select
                                onChange={(event) => componentRef.current = event.target.value}>
                                <option value="Commitment to Equity, Diversity and Inclusion">Commitment to Equity, Diversity and Inclusion</option>
                                <option value="Gender Expertise">Gender Expertise</option>
                                <option value="Access to Resources">Access to Resources</option>
                                <option value="Program Design">Program Design</option>
                                <option value="Program Development">Program Development</option>
                                <option value="Program Delivery">Program Delivery</option>
                                <option value="Program Evaluation">Program Evaluation</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>


                    <Form.Group
                        as={Row} className="mb-3"
                        value={descriptionRef}
                        onChange={(event) => descriptionRef.current = event.target.value}>
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
                                onChange={e => setScoring(e.target.value)}
                                step={2}
                                min={1}
                                max={11}
                                tooltip={"on"}
                                tooltipPlacement={"top"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col xs={12} >
                            <Form.Check
                                type="switch"
                                id="switch-has-na"
                                label="Has N/A"
                                ref={hasNARef}
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
            </Row >
        </div>
    )
}