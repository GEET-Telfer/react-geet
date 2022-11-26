import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import { AdminQuestionCtx } from '../../../../context/AdminQuestionContext';


export default function QuestionModal(props) {
    const { modalShow, setModalShow, handleModalClose, question } = props;
    const { id, component, description, has_NA, scoring } = question;

    // Context    
    const {
        needUpdate, setNeedUpdate, setShowEdit
    } = useContext(AdminQuestionCtx);

    // State
    const [scoring_, setScoring] = useState(scoring);

    // Ref
    const componentRef = useRef(component);
    const descriptionRef = useRef(description);
    const hasNARef = useRef(has_NA);


    const handleQuestionUpdate = () => {
        const data = {
            id: id,
            component: componentRef.current,
            description: descriptionRef.current,
            scoring: scoring_,
            hasNA: hasNARef.current.value === "on" ? 1 : 0
        };

        axios.post("/wp-json/assessment/v1/update", data)
            .then(async () => {
                await axios.post("http://localhost:5005/admin/assessment/update")
                    .then(() => {
                        setNeedUpdate(!needUpdate);
                        setShowEdit(true);
                        setModalShow(false);
                    });
            }).catch((err) => {
                console.error(err);
            })
    }

    return (
        <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col xs={12}>
                            <Form.Label>Question Component</Form.Label>
                            <Form.Select
                                disabled
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
                            <Form.Control as="textarea" rows={3} defaultValue={descriptionRef.current} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col xs="12">
                            <Form.Label> Scoring </Form.Label>
                            <RangeSlider
                                value={scoring_}
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
    )
}