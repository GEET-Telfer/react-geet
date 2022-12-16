import { Button } from "react-bootstrap";

/**
 * Side nav button for toggling questions based on their component attribute
 */
export default function QuestionButton(props) {
    const { description, handleQuestionButton } = props;
    return (
        <div className="d-grid gap-1 d-none d-sm-block d-md-block" style={{minWidth: "120px", maxWidth : "130px"}}>
            <Button
                id={description}
                className={`mb-3 btn-side-nav`}
                onClick={handleQuestionButton}
            >
                {description}
            </Button>
        </div>
    )
}