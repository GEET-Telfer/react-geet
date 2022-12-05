import { Col, Row, Stack, Ratio } from "react-bootstrap";

/**
 * a Micro-Learning row module in MicroLearning Directory
 */
export default function MicroLearningSnippet(props) {
  const { data } = props;

  const { id, title, video_link, duration, content } = data;

  return (
    <Row className={"mb-5 snippet"} md={10}>
      <Col xs={12} md={4}>
          <Ratio aspectRatio={"4x3"}>
            <iframe
              className={"img-fluid rounded"}
              title={title}
              src={`${video_link}`}
            />
          </Ratio>
      </Col>
      <Col xs={12} md={6}>
        <Stack gap={3}>
          <div className="mb-2">
            <a
              href={`${process.env.REACT_APP_HOST}/${process.env.REACT_APP_MICRO_LEARNING_MODULE_ROUTE}?id=${id}`}
            >
              <h3>{title}</h3>
            </a>
            <small>Estimation: {duration || "15 minutes"}</small>
          </div>

          <div className="mb-2 micro-learning-short-description">
            <p
              style={{
                whiteSpace: "breakSpace",
                maxHeight: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          </div>
        </Stack>
      </Col>
    </Row>
  );
}
