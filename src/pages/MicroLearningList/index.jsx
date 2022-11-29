import { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import MicroLearningSnippet from "./components/MicroLearningSnippet";
import {useWindowDimensions} from "../../hooks";



export default function MicroLearningList(props) {

    const [courseList, setCourseList] = useState([]);
    const { width } = useWindowDimensions();

    useEffect(() => {
        axios.get("http://localhost:5005/course/fetch-all").then((res) => {
          setCourseList(res.data.data);
        });
      }, []);

    return(
        <Container fluid="true" style={{width:width * 0.9}}>
            {Object.keys(courseList).map((index) => {
              return (
                <MicroLearningSnippet
                  key={courseList[index].id}
                  data={courseList[index]}
                />
              );
            })}
          </Container>
    )
}