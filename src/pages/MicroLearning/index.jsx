import { useEffect } from "react";
import Video from './components/Video';
import Article from './components/Article';
import axios from "axios";

export default function MicroLearning(props) {

    const searchParams = new URLSearchParams(document.location.search);

    const id = searchParams.get('id');


    useEffect(() => {
        axios.get("/wp-json/course/v1/get", {id : id})
        .then((res) => {
            console.log(res.data);
        })
    });
    
    return(
        <div align="center">
            <h1>MicroLearning Module {id}</h1>
            {
                id ? <Video title={"placeholder"} videoSrc={"https://www.youtube.com/embed/r4E3fWZHeds"}/>
                : <Video title={"placeholder"} videoSrc={"https://www.youtube.com/embed/lkIFF4maKMU"}/>
            }
            <Article />
        </div>
    )
}