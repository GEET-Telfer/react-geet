import { Modal, Button } from "react-bootstrap";

/**
 * A pop-up confirmation modal for deleting existing question.
 */
export default function ConfirmationModal(props) {
  const { modalShow, setModalShow, setConfirm } = props;

  return (
    <Modal show={modalShow}>
      <Modal.Body>
        <p align="center">Are you sure?</p>
        <small>
          Do you really want to delete the question? This process cannot be
          undone.
        </small>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => {
            setConfirm(true);
            setModalShow(false);
          }}
        >
          Yes
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            setModalShow(false);
            setModalShow(false);
          }}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
