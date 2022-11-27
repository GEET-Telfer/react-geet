import { Fragment } from "react";


export default function MicroLearningSnippet(props) {

    const { paramsString } = props;
    const searchParams = new URLSearchParams(paramsString);
    const link = `http://localhost/react-micro-learning?${paramsString}`;

    return (
        <div>
            <a href={link} >{paramsString}</a>
            <hr />
        </div>
    )
}