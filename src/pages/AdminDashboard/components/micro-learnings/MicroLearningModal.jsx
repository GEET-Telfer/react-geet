import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
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
  const contentRef = useRef(content);

  const handleCoursenUpdate = async () => {
    alert("onModalUpdate");

    let data = {
      id: id,
      //   title: titleRef.current,
      title: titleState,
      video_link: videoLinkRef.current,
      content: JSON.stringify(contentRef.current),
    };

    console.log(data);

    return;
    // await axios
    //   .post(`http://localhost:5005/admin/course/update`, data)
    //   .then(() => {
    //     alert("updated");
    //     setModalShow(false);
    //     // reset form
    //     titleRef.current.value = "";
    //     videoLinkRef.current.value = "";
    //     contentRef.current.value = "";
    //   });
  };

  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Body>
        <Form>
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
                  onChange={(event) => {
                    contentRef.current = event.blocks;
                  }}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  editorStyle={{
                    border: "1px solid black",
                    position: "relative",
                    overflow: "scroll",
                    backgroundColor: "lightblue",
                    height: "400px",
                  }}
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
