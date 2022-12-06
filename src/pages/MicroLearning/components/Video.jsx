import { Row, Col } from "react-bootstrap";

export default function Video(props) {
  const { videoSrc, title } = props;

  return (
    <Row className="m-2 mb-4">
      <Col>
        <div align="center">
          <iframe
            style={{
              width: 740,
              height: 420,
            }}
            title={title}
            allowfullscreen
            src={videoSrc}
          />
        </div>
      </Col>
    </Row>
  );
}
