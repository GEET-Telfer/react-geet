import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

export default function Intro() {
  return (
    <Fragment>
      <Row>
        <Col xs={8} md={{offset: 2, span:8}}>
          <h1>How to get started?</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={0} md={{offset: 2, span:8}}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
            vulputate mi sit amet. In fermentum posuere urna nec tincidunt
            praesent semper. Elementum integer enim neque volutpat ac tincidunt
            vitae semper quis. Venenatis cras sed felis eget velit. Maecenas
            pharetra convallis posuere morbi leo urna molestie at elementum.
            Pellentesque habitant morbi tristique senectus et netus. Tincidunt
            id aliquet risus feugiat in ante. Leo duis ut diam quam nulla
          </p>
        </Col>
      </Row>
    </Fragment>
  );
}
