import Video from './components/Video';
import Article from './components/Article';
import {useParams} from "react-router-dom";
// import { useEffect } from 'react';

export default function MicroLearning() {
    let { id } = useParams();

    // useEffect(() => {
    //     console.log(id);
    // }, []);

    return(
        <div align="center">
            <h1>MicroLearning</h1>
            {
                id ? <Video title={"placeholder"} videoSrc={"https://www.youtube.com/embed/r4E3fWZHeds"}/>
                : <Video title={"placeholder"} videoSrc={"https://www.youtube.com/embed/lkIFF4maKMU"}/>
            }
            <Article />
        </div>
    )
}