import { useState, useEffect, Fragment } from 'react';


export default function Video(props) {
    const { videoSrc, title } = props;

    return (
        <Fragment>
            <iframe width="750" height="560"
            title={title}
                allowfullscreen
                src={videoSrc}>
            </iframe>
        </Fragment>
    )
}