import axios from "axios";
import { useState, useRef, useContext } from "react";
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
import { AdminQuestionCtx } from "../../../../context/AdminQuestionContext";

/**
 * update-micro-learning modal
 */
export default function MicroLearningModal(props) {
  const {
    id,
    uuid,
    title,
    video_link,
    content,
    course_status,
    modalShow,
    setModalShow,
    handleModalClose,
  } = props;

  // State
  const [titleState, setTitleState] = useState(title); 
  const [videoLinkState, setVideoLinkState] = useState(video_link);
  const [courseStatus, setCourseStatus] = useState(course_status); // micro-learning status

  // Ref
  const titleRef = useRef(title);
  const videoLinkRef = useRef(video_link);

  // Context
  const { needUpdate, setNeedUpdate } = useContext(AdminQuestionCtx);

  // WYSIWYG Editor
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
      uuid : uuid,
      title: titleRef.current,
      video_link: videoLinkRef.current,
      content: newContent.value,
      course_status : courseStatus
    };

    await axios
      .post(
        `${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/update`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          alert("updated");
          setModalShow(false);
          setNeedUpdate(!needUpdate);
        } else {
          alert("Request didn't go through");
        }
      }).catch((err) => {
        // console.log(err);
        alert(`Error: ${err?.response?.data}`);
      });
  };

  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Body>
        <Form id={"update-course-form"}>
          {/* micro-learning title */}
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label>Microlearning Module Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={titleState}
                onChange={(e) => {
                  setTitleState(e.target.value); // render new title
                  titleRef.current = e.target.value; // save the latest title value
                }}
              />
            </Col>
          </Form.Group>

          {/* micro-learning youtube embedded link */}
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label>Microlearning Module Video Link</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={videoLinkState}
                onChange={(e) => {
                  setVideoLinkState(e.target.value); //render new link
                  videoLinkRef.current = e.target.value; // save the latest link value
                }}
              />
            </Col>
          </Form.Group>

          {/* Microlearning status */}
          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Form.Label>Microlearning Module Status</Form.Label>
              <Form.Control
                as={"select"}
                defaultValue={courseStatus}
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

          {/* wysiwyg editor */}
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
                  editorState={updatedContent}
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
