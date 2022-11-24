import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Article from "../../MicroLearning/components/Article";

export default function Instruction(props) {

    const { hasConsent, setConsent } = props;

    const [cookies, setCookie] = useCookies();

    // if the user hasn't read/ consent the instruction sheet, display the modal.
    const [show, setShow] = useState((hasConsent === undefined));

    const handleClose = (() => {
        setShow(false);
        setConsent(true);
        setCookie('assessment-consent', true,
            {
                path: "/",
                expires: new Date(Date.now() + 30 * 60 * 1000),
                httpOnly: false
            });
    });

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size={'xl'}
                fullscreen={'xxl-down'}
                animation
            >
                <Modal.Header align="center">
                    <h1>Instructions & Privacy Consent</h1>
                </Modal.Header>
                <Modal.Body scrollable="true" >
                    <Article />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        I Agree & Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}