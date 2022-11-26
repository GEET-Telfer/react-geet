import {Fragment, useEffect, useState} from 'react';
import { Row } from 'react-bootstrap';

export default function CreateMicroLearningModule(props) {
    const {activeKey, tag} = props;

    return(
        <Row className={(activeKey === tag) ? "d-block" : "d-none"}>
            CreateMicroLearningModule
        </Row>
    )
}