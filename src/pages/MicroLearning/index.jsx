import { useEffect, useState } from "react";
import Video from './components/Video';
import Article from './components/Article';
import axios from "axios";

export default function MicroLearning(props) {

    const searchParams = new URLSearchParams(document.location.search);

    const id = searchParams.get('id');

    const [course, setCourse] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5005/course/get?id=${id}`)
        .then((res) => {
            setCourse(res.data.data[0]);
            console.log(res.data.data[0]);
        })
    }, []);
    
    return(
        <div align="center">
            <h1>{course?.title}</h1>
            <Video title={course?.title} videoSrc={course?.video_link}/>
            <Article content={course?.content} />
        </div>
    )
}