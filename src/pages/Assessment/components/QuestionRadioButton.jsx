import { Fragment, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ProgressCtx } from '../../../context/ProgressContext';
/**
 * Radio button module for Assessment questions.
 */
export default function QuestionRadioButton(props) {
    const { isFirst, isLast, id, index, componentName } = props;

    const {progress, addItem2Progress} = useContext(ProgressCtx);

    const handleRadioButtonClick = (event) => {
        const eleId = event.target.id.split("-");
        const questionId = eleId[1];
        const index = eleId[2];

        const progressItem = {
            id: questionId,
            value: parseInt(index) + 1,
            component : componentName
        };

        addItem2Progress(progressItem);
    }

    return (

        <Fragment>
            {
                isFirst && <Form.Label className="assessment-question-label">Disagree</Form.Label>
            }
            <Form.Check
                className={`mb-3 radio-questions ${progress[id] && "answered"}`}
                inline
                name={`scoring-${id}`}
                type="radio"
                id={`scoring-${id}-${index}`}
                onClick={handleRadioButtonClick}
                onChange={() => {}}
                checked = {progress[id]?.value === (index + 1)}
            />
            {
                isLast && <Form.Label className="assessment-question-label">Agree</Form.Label>
            }
        </Fragment>

    )
}