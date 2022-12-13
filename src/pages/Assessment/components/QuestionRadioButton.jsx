import { Fragment, useContext } from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ProgressCtx } from "../../../context/ProgressContext";
/**
 * Radio button module for Assessment questions.
 */
export default function QuestionRadioButton(props) {
  const { isFirst, isLast, uuid, index, componentName } = props;

  const { progress, addItem2Progress } = useContext(ProgressCtx);

  const handleRadioButtonClick = (event) => {
    const eleId = event.target.id.split("_");
    const questionId = eleId[0];
    const index = eleId[1];

    const progressItem = {
      id: questionId,
      value: parseInt(index) + 1,
      component: componentName,
    };

    addItem2Progress(progressItem);
  };

  return (
    <Fragment>
        <Form.Check
          className={`mb-3 col-1 radio-questions ${progress[uuid] ? "answered" : ""}`}
          inline
          name={`scoring-${uuid}`}
          type="radio"
          id={`${uuid}_${index}`}
          onClick={handleRadioButtonClick}
          onChange={() => {}}
          checked={progress[uuid]?.value === index + 1}
        />
    </Fragment>
  );
}
