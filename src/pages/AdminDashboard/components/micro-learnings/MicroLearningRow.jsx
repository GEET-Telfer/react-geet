import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Stack, Ratio, Button } from "react-bootstrap";
import ConfirmationModal from "./ConfirmationModal";
import MicroLearningModal from "./MicroLearningModal";

/**
 * MicroLearning Row for admin control
 */
export default function MicroLearningRow(props) {
  const { data } = props;

  const { id, title, video_link, duration, content } = data;

  const [show, setShow] = useState(true); // toggle on micro-learning row display
  const [modalShow, setModalShow] = useState(false); // toggle on update-course modal
  const handleModalClose = () => setModalShow(false); // close update-course modal
  const handleModalShow = () => setModalShow(true); // open update-course modal

  const [confirm, setConfirm] = useState(false); //confirmation on deleting the course
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // toggle confirm-on-delete modal

  const handleUpdateCourse = () => {
    handleModalShow();
  };

  const handleDeleteCourse = () => {
    setShowConfirmationModal(true);
  };

  useEffect(() => {
    if (confirm === true) {
      axios
        .post(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/delete`, {
          id: id,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("MicroLearning Module is Deleted");
            setShow(false);
          } else {
            alert("Request didn't go through");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [confirm]);

  return (
    <div className={show ? "d-block" : "d-none"}>
      <MicroLearningModal
        id={id}
        title={title}
        video_link={video_link}
        content={content}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalClose={handleModalClose}
      />

      <ConfirmationModal
        setConfirm={setConfirm}
        modalShow={showConfirmationModal}
        setModalShow={setShowConfirmationModal}
      />

      <Row className={"mb-3 snippet"}>
        {/* embedded video */}
        <Col xs={12} md={4}>
          <Ratio aspectRatio={"4x3"}>
            <iframe
              className={"img-fluid rounded"}
              title={title}
              src={`${video_link}`}
            />
          </Ratio>
        </Col>
        {/* title and content */}
        <Col xs={12} md={5}>
          <Stack gap={3}>
            <div>
              <a
                href={`${process.env.REACT_APP_HOST}/react-micro-learning?id=${id}`}
              >
                <h4>{title}</h4>
              </a>
              <small>Estimation: {duration || "15 minutes"}</small>
            </div>
            <div>
              <b>Content:</b>
              <p
                className={"micro-learning-content"}
                style={{
                  whiteSpace: "breakSpace",
                  maxWidth: "300px",
                  maxHeight: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              ></p>
            </div>
          </Stack>
        </Col>
        <Col xs={12} md={1}>
          <Button variant="primary" onClick={handleUpdateCourse}>
            UPDATE
          </Button>
        </Col>
        <Col xs={12} md={1}>
          <Button
            variant="danger"
            onClick={handleDeleteCourse}
            style={{ marginLeft: 15 }}
          >
            DELETE
          </Button>
        </Col>
      </Row>
    </div>
  );
}
