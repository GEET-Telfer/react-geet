import { Fragment, useState, useRef } from 'react';
import { Row, Col, Form, Toast, Button } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer';

import _ from 'lodash';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateMicroLearningModule(props) {
    const { activeKey, tag } = props;


    const [show, setShow] = useState(false);

    const titleRef = useRef("");
    const videoLinkRef = useRef("");
    const contextRef = useRef("");

    const handleCreateMicroLearningModule = async () => {

        const data = {
            title: titleRef.current,
            video_link: videoLinkRef.current,
            context: JSON.stringify(contextRef.current)
        };

        await axios.post("/wp-json/course/v1/add", data)
            .then(() => {
                // notify admin
                setShow(true);
            })
            .then(() => {
                axios.post("http://localhost:5005/admin/course/delete");
                // reset form
                titleRef.current.value = "";
                videoLinkRef.current.value = "";
                contextRef.current.value = "";
            })
            .catch((err) => {
                console.error(err);
            });

    }

    return (
        <Fragment>
            <Row className={(activeKey === tag) ? "d-block" : "d-none"}>
                <ToastContainer className="p-3" position={'middle-center'}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>Micro Learning Module Is Added</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Row>

            <Row>
                <Form>
                    <Form.Group
                        as={Row} className="mb-3"
                        value={titleRef}
                        onChange={(event) => titleRef.current = event.target.value}>
                        <Col>
                            <Form.Label>Micro Learning Module Title</Form.Label>
                            <Form.Control as="textarea" rows={1} />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row} className="mb-3"
                        value={videoLinkRef}
                        onChange={(event) => videoLinkRef.current = event.target.value}>
                        <Col>
                            <Form.Label>Micro Learning Module Video Link</Form.Label>
                            <Form.Control as="textarea" rows={1} />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row} className="mb-3">
                        <Col>
                            <div className="wrapper-overflow" style={{
                                position: "relative",
                                overflow: "scroll",
                                height: "400px"
                            }}>
                                <Form.Label>Micro Learning Module Context</Form.Label>

                                <Editor
                                    onChange={(event) => {
                                        contextRef.current = (event.blocks);
                                    }}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    editorStyle={{
                                        border: "1px solid black", position: "relative",
                                        overflow: "scroll", backgroundColor: "lightblue", height: "400px"
                                    }}
                                />
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col xs={12}>
                            <Button variant="primary" onClick={handleCreateMicroLearningModule}>
                                Submit
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Fragment>
    )
}