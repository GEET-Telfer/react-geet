import axios from "axios";
import { useState } from "react";
import { Col, Row, Stack, Ratio, Button } from "react-bootstrap";
import MicroLearningModal from "./MicroLearningModal";

export default function MicroLearningRow(props) {
  const { data } = props;

  const { id, title, video_link, content } = data;

  const [show, setShow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleUpdateCourse = () => {
    handleModalShow();
  };

  const handleDeleteCourse = async () => {
    axios
      .post(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/delete`, {
        id: id,
      })
      .then(() => {
        alert("MicroLearning Module is Deleted");
        setShow(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      <Row className={"mb-3"}>
        <Col xs={12} md={4}>
          <Ratio aspectRatio={"4x3"}>
            <iframe title={title} allowFullScreen src={`${video_link}`} />
          </Ratio>
        </Col>
        <Col xs={12} md={5}>
          <Stack gap={3}>
            <div className="bg-light border">
              <a href={`${process.env.REACT_APP_HOST}/react-micro-learning?id=${id}`}>
                <h4>{title}</h4>
              </a>
            </div>
            <div className="bg-light border">
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
        <Col xs={12} md={{ offset: 1, span: 1 }}>
          <Button variant="danger" onClick={handleDeleteCourse}>
            DELETE
          </Button>
        </Col>
      </Row>
    </div>
  );
}
