import { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Toast, Button } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";

import _ from "lodash";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateMicroLearningModule(props) {
  const { id, title, videoLink, content } = props;

  const [show, setShow] = useState(false);

  const isCreate = id ? false : true; //flag for create or edit

  const titleRef = useRef(title ? title : "");
  const videoLinkRef = useRef(videoLink ? videoLink : "");
  const contentRef = useRef(content ? content : "");

  useEffect(() => {
    console.log({ isCreate });
  }, []);

  const handleCreateMicroLearningModule = async () => {
    let data = {
      title: titleRef.current,
      video_link: videoLinkRef.current,
      content: JSON.stringify(contentRef.current),
    };

    if (id) {
      data.id = id;

      await axios
        .post("/wp-json/course/v1/update", data)
        .then(setShow(true))
        .then(() => {
          axios.post("http://localhost:5005/admin/course/update");
          // reset form
          titleRef.current.value = "";
          videoLinkRef.current.value = "";
          contentRef.current.value = "";
        });
    } else {
      await axios
        .post("/wp-json/course/v1/add", data)
        .then(() => {
          // notify admin
          setShow(true);
        })
        .then(() => {
          axios.post("http://localhost:5005/admin/course/delete");
          // reset form
          titleRef.current.value = "";
          videoLinkRef.current.value = "";
          contentRef.current.value = "";
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
            <Toast.Body>
              Micro Learning Module Is {isCreate ? "Added" : "Updated"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>

      <Row>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
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

          <Form.Group as={Row} className="mb-3">
            <Col xs={12}>
              <Button
                variant="primary"
                onClick={handleCreateMicroLearningModule}
              >
                {isCreate ? "Submit" : "Edit"}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}
