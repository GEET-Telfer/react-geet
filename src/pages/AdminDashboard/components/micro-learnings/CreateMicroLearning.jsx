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

/**
 * Micro-learning creation component
 */
export default function CreateMicroLearningModule(props) {
  const [show, setShow] = useState(false);

  const titleRef = useRef(""); // title Ref for real-time update on value
  const [title, setTitle] = useState(""); // title state for updating on UI
  const videoLinkRef = useRef(""); // video link Ref for real-time update on value
  const [videoLink, setVideoLink] = useState(""); // video link State for updating on UI

  const [content, setContent] = useState(); // micro-learning content in HTML string
  const [courseStatus, setCourseStatus] = useState("draft"); // micro-learning status

  // WYSIWYG editor setup
  let editorState = EditorState.createEmpty();
  const [editorContent, setEditorContent] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setEditorContent(editorState);
  };

  // submit request on creating a micro-learning resource
  const handleCreateMicroLearningModule = async () => {
    let data = {
      title: titleRef.current,
      video_link: videoLinkRef.current,
      content: content.value,
      course_status : courseStatus
    };

    await axios
      .post(
        `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/create`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          // notify admin
          setShow(true); // display toast if succeed
          // reset Editor content
          const editorState = EditorState.createEmpty();
          setEditorContent(editorState);
          // reset form input
          document.getElementById("create-course-form").reset();
          setCourseStatus("draft");
        } else {
          alert("Request didn't go through");
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
            <Toast.Body>Microlearning Module Is Added</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>

      <Row>
        <Form id={"create-course-form"}>
          {/* Micro-learning Title */}
          <Form.Group
            as={Row}
            className="mb-3"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              titleRef.current = event.target.value;
            }}
          >
            <Col>
              <Form.Label>Microlearning Module Title</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Col>
          </Form.Group>

          {/* Micro-learning Youtube video link */}
          <Form.Group
            as={Row}
            className="mb-3"
            value={videoLink}
            onChange={(event) => {
              setVideoLink(event.target.value);
              videoLinkRef.current = event.target.value;
            }}
          >
            <Col>
              <Form.Label>Microlearning Module Video Link</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Col>
          </Form.Group>

          {/* Microlearning module status */}
          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Microlearning Module Status</Form.Label>
              <Form.Control
                as={"select"}
                onChange={(event) => {
                  setCourseStatus(event.target.value);
                }}
              >
                <option value="draft">Draft</option>
                <option value="under_review">Under Review</option>
                <option value="publish">Publish</option>
              </Form.Control>
            </Col>
          </Form.Group>

          {/* WYSIWYG editor for Micro-learning content */}
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
                <Form.Label>Microlearning Module content</Form.Label>

                <Editor
                  editorState={editorContent}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                  editorStyle={{
                    border: "1px solid",
                    // boxShadow: "5px 5px #888888",
                    position: "relative",
                    overflow: "scroll",
                    backgroundColor: "#F5F5F5",
                    height: "400px",
                  }}
                />
                {/* hidden element for converting editor content to html string */}
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
          {/* Submit */}
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
