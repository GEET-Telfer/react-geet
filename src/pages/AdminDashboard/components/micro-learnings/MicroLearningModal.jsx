import axios from "axios";
import { useState, useRef } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function MicroLearningModal(props) {
  const {
    id,
    title,
    video_link,
    content,
    modalShow,
    setModalShow,
    handleModalClose,
  } = props;

  const [titleState, setTitleState] = useState(title);
  const [videoLinkState, setVideoLinkState] = useState(video_link);

  const titleRef = useRef(title);
  const videoLinkRef = useRef(video_link);

  const [newContent, setNewContent] = useState();
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(content))
  );
  const [updatedContent, setUpdatedContent] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setUpdatedContent(editorState);
  };

  const handleCoursenUpdate = async () => {
    let data = {
      id: id,
      title: titleRef.current,
      video_link: videoLinkRef.current,
      content: newContent.value,
    };

    await axios
      .post(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/update`, data)
      .then(() => {
        alert("updated");
        setModalShow(false);
      });
  };

  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Body>
        <Form id={"update-course-form"}>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label>Micro Learning Module Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={titleState}
                onChange={(e) => {
                  setTitleState(e.target.value); // render new title
                  titleRef.current = e.target.value; // save the latest title value
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label>Micro Learning Module Video Link</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={videoLinkState}
                onChange={(e) => {
                  setVideoLinkState(e.target.value); //render new link
                  videoLinkRef.current = e.target.value; // save the latest link value
                }}
              />
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
                  editorState={updatedContent}
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
                  ref={(val) => setNewContent(val)}
                  value={draftToHtml(
                    convertToRaw(updatedContent.getCurrentContent())
                  )}
                />
              </div>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCoursenUpdate}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
