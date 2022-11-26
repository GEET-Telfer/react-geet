import axios from "axios";
import { Fragment, useEffect, useState, useContext } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import { AdminQuestionCtx } from '../../../../context/AdminQuestionContext';

export default function QuestionRow(props) {
    const { index, question } = props;

    const [show, setShow] = useState(true);

    const {
        needUpdate, setNeedUpdate, 
        setShowDelete, setShowEdit
    } = useContext(AdminQuestionCtx);

    const handleQuestionDeletion = async () => {
        await axios.post("/wp-json/assessment/v1/delete", { id: question.id })
            .then(async () => {
                await axios.post("http://localhost:5005/admin/assessment/delete")
                    .then(() => {
                        setNeedUpdate(!needUpdate);
                        setShowDelete(true);
                        setShow(false);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleQuestionUpdate = async () => {
        const data = {
            id: question.id
        }
        await axios.post("/wp-json/assessment/v1/update", data)
        .then(async () => {
            await axios.post("http://localhost:5005/admin/assessment/update")
                .then(() => {
                    setNeedUpdate(!needUpdate);
                    setShowEdit(true);
                    setShow(false);
                });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className={(show) ? "d-block" : "d-none"}>
            <Row >
                <Col sx={1} md={1}>{index + 1}</Col>
                <Col sx={6} md={6}>{question.description}</Col>
                <Col sx={1} md={1}>{(question.has_NA === 1) ? "true" : "false"}</Col>
                <Col sx={1} md={1}>{question.scoring}</Col>
                <Col sx={1} md={1}>
                    <Button
                        variant={"primary"}
                        onClick={handleQuestionUpdate}>UPDATE
                    </Button>
                </Col>
                <Col sx={1} md={1}>
                    <Button
                        variant={"danger"}
                        onClick={handleQuestionDeletion}
                        style={{ marginLeft: 15 }}>DELETE
                    </Button>
                </Col>
            </Row>
            <hr />
        </div>
    )
}