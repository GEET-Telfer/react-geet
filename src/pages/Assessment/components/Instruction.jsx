import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Article from "../../MicroLearning/components/Article";

/**
 * Consent and Instruction Page for assessment questions.
 */
export default function Instruction(props) {

    const { hasConsent, setConsent } = props;

    const [cookies, setCookie] = useCookies();

    // if the user hasn't read/ consent the instruction sheet, display the modal.
    const [show, setShow] = useState((hasConsent === undefined || hasConsent === false));

    const handleClose = (() => {
        setShow(false);
        setConsent(false);
    });

    const handleAgree = (() => {
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
                animation
            >
                <Modal.Header align="center" closeButton>
                    <h1>Instructions & Privacy Consent</h1>
                </Modal.Header>
                <Modal.Body scrollable="true" >
                    <Article />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleAgree}>
                        I Agree 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}