import { Fragment, useEffect, useState } from "react";
import { Video, Article } from "./components";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useWindowDimensions } from "../../hooks";
import Header from "../../components/Header";

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

  const breadcrumbItems = [
    { title: "Home", link: process.env.REACT_APP_HOST },
    { title: "Training Modules", link : `${process.env.REACT_APP_HOST}/${process.env.REACT_APP_MICRO_LEARNING_MODULE_LIST_ROUTE}`},
  ];

  return (
    <Fragment>
      <Header breadcrumbItems={breadcrumbItems} title={course?.title} />
      <Container fluid="true" className={"mt-5"}>
        {/* <h1 align="center">{course?.title}</h1> */}
        <Video title={course?.title} videoSrc={course?.video_link} />
        <Article content={course?.content} />
      </Container>
    </Fragment>
  );
}
