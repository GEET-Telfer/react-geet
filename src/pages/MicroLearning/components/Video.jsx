import { Row, Col } from "react-bootstrap";

export default function Video(props) {
  const { videoSrc, title } = props;

  return (
    <Row>
      <Col>
        <div align="center">
          <iframe
            width="740"
            height="420"
            title={title}
            allowfullscreen
            src={videoSrc}
           />
        </div>
      </Col>
    </Row>
  );
}
