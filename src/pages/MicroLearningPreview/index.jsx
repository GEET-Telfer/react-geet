import { Fragment, useEffect, useState } from "react";
import { Video, Article } from "../MicroLearning/components";
import axios from "axios";
import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import geetLogo from "../../assets/geet-logo-large.png";
/**
 * Micro-learning module page
 */
export default function MicroLearningPreview() {
  // get micro-learning resource id from url
  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("id");

  const [course, setCourse] = useState(); // micro-learning information

  useEffect(() => {
    // fetch micro-learning information based on id
    axios
      .get(`${process.env.REACT_APP_GATEWAY_ENDPOINT}/admin/course/get?id=${id}`)
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
    { title: "Admin Dashboard", link : `${process.env.REACT_APP_HOST}/${process.env.REACT_APP_ADMIN_ROUTE}`},
  ];

  return (
    <Fragment>
      <Header breadcrumbItems={breadcrumbItems} title={`${course?.title}(${course?.course_status})`} />
      
      <img className={"sticky-icon"} src={geetLogo} alt="GEET LOGO" />

      <Container fluid="true" className={"mt-5"} style={{minHeight : "65vh"}}>
        {/* <h1 align="center">{course?.title}</h1> */}
        <Video title={course?.title} videoSrc={course?.video_link} />
        <Article content={course?.content} />
      </Container>
    </Fragment>
  );
}
