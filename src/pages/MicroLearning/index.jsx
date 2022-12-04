import { useEffect, useState } from "react";
import { Video, Article } from "./components";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useWindowDimensions } from "../../hooks";

/**
 * Micro-learning module page
 */
export default function MicroLearning(props) {
  // get micro-learning resource id from url
  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("id");

  const [course, setCourse] = useState(); // micro-learning information

  const { width } = useWindowDimensions(); // width of the box-size

  useEffect(() => {
    // fetch micro-learning information based on id
    axios
      .get(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/course/get?id=${id}`)
      .then((res) => {
        setCourse(res.data.data[0]);
      })
      .catch((err) => {
        alert("Oops, something wrong happened!");
        console.log(err);
      });
  }, []);

  return (
    <Container fluid="true" style={{ width: width * 0.9 }}>
      <h1 align="center">{course?.title}</h1>
      <Video title={course?.title} videoSrc={course?.video_link} />
      <Article content={course?.content} />
    </Container>
  );
}
