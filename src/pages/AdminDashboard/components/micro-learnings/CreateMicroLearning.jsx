import { useState, useRef } from "react";
import { Row, Col, Form, Toast, Button } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateMicroLearningModule(props) {
  const [show, setShow] = useState(false);

  const titleRef = useRef("");
  const videoLinkRef = useRef("");

  const [content, setContent] = useState();

  let editorState = EditorState.createEmpty();
  const [editorContent, setEditorContent] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setEditorContent(editorState);
  };

  const handleCreateMicroLearningModule = async () => {
    let data = {
      title: titleRef.current,
      video_link: videoLinkRef.current,
      content: content.value,
    };

    await axios
      .post(`http://localhost:5005/admin/course/create`, data)
      .then(() => {
        // notify admin
        setShow(true);
        // reset Editor content
        const editorState = EditorState.createEmpty();
        setEditorContent(editorState);
        // reset form input
        document.getElementById("create-course-form").reset();
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
            <Toast.Body>Micro Learning Module Is Added</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>

      <Row>
        <Form id={"create-course-form"}>
          <Form.Group
            as={Row}
            className="mb-3"
            ref={(val) => (titleRef.current = val)}
            value={titleRef}
            onChange={(event) => (titleRef.current = event.target.value)}
          >
            <Col>
              <Form.Label>Micro Learning Module Title</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            ref={(val) => (videoLinkRef.current = val)}
            value={videoLinkRef}
            onChange={(event) => (videoLinkRef.current = event.target.value)}
          >
            <Col>
              <Form.Label>Micro Learning Module Video Link</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <div
                className="wrapper-overflow"
                style={{
                  position: "relative",
                  overflow: "scroll",
                  height: "400px",
                }}
              >
                <Form.Label>Micro Learning Module content</Form.Label>

                <Editor
                  editorState={editorContent}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  editorStyle={{
                    border: "1px solid black",
                    position: "relative",
                    overflow: "scroll",
                    backgroundColor: "lightblue",
                    height: "400px",
                  }}
                />

                <textarea
                  style={{ display: "none" }}
                  disabled
                  ref={(val) => setContent(val)}
                  value={draftToHtml(
                    convertToRaw(editorContent.getCurrentContent())
                  )}
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Button
                variant="primary"
                onClick={handleCreateMicroLearningModule}
              >
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}
