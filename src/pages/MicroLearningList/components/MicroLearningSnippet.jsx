import { useEffect, useState } from "react";

import { Col, Row, Stack, Ratio } from "react-bootstrap";

export default function MicroLearningSnippet(props) {
  // const { paramsString } = props;
  // const searchParams = new URLSearchParams(paramsString);
  // const link = `http://localhost/react-micro-learning?id=${paramsString}`;

  const { data } = props;

  const { id, title, video_link, content } = data;


  useEffect(() => {
    if (!data ) {
      alert('fetch data from server');
    }

    // console.log(content);
  }, []);

  return (
    <Row className={"mb-3"}>
      <Col xs={12} md={4}>
        <Ratio aspectRatio={"4x3"}>
          <iframe title={title} allowFullScreen src={`${video_link}`} />
        </Ratio>
      </Col>
      <Col xs={12} md={8}>
        <Stack gap={3}>
          <div className="bg-light border">
            <a href={`${process.env.REACT_APP_HOST}/react-micro-learning?id=${id}`}>
              <h4>{title}</h4>
            </a>
          </div>
          <div className="bg-light border">
            <p
              style={{
                whiteSpace: "breakSpace",
                  maxWidth: "100%",
                  maxHeight : "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word"
              }}
              dangerouslySetInnerHTML={{ __html: content}}
            >
            </p>
          </div>
        </Stack>
      </Col>
    </Row>
  );
}
