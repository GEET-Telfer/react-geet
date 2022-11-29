import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Stack, Ratio, Button } from "react-bootstrap";

export default function MicroLearningRow(props) {
  const { data } = props;

  const { id, title, video_link, content } = data;

  const [show, setShow] = useState(true);

  const [parsedContent, setParsedContent] = useState("");

  useEffect(() => {
    console.log(content);
  }, []);

  const handleUpdateCourse = () => {
    // TODO: redirect to CreateMicroLearning
  };

  const handleDeleteCourse = async () => {
    axios
      .post("/wp-json/course/v1/delete", { id: id })
      .then(async (res) => {
        await axios
          .post("http://localhost:5005/admin/course/delete")
          .then(() => {
            alert("MicroLearning Module is Deleted");
            setShow(false);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={show ? "d-block" : "d-none"}>
      <Row className={"mb-3"}>
        <Col xs={12} md={4}>
          <Ratio aspectRatio={"4x3"}>
            <iframe title={title} allowfullscreen src={`${video_link}`} />
          </Ratio>
        </Col>
        <Col xs={12} md={5}>
          <Stack gap={3}>
            <div className="bg-light border">
              <a href={`http://localhost/react-micro-learning?id=${id}`}>
                <h4>{title}</h4>
              </a>
            </div>
            <div className="bg-light border">
              <b>Content:</b>
              <p
                style={{
                  whiteSpace: "nowrap",
                  width: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {content}
              </p>
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
