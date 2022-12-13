import { Col, Container, Row, Form } from "react-bootstrap";
import QuestionRadioButton from "./QuestionRadioButton";

/**
 * Quesation List is composed of Assessment Category(title), descriptions and radio buttons
 */
export default function QuestionList(props) {
  const { questionList, componentName } = props;

  const questionRow = (question) => {
    const radioButtons = [];
    const SCORE_SCALE = 5;
    for (let i = 0; i < SCORE_SCALE; i++) {
      radioButtons.push(
        <QuestionRadioButton
          componentName={componentName}
          key={`${question.uuid}-${i}`}
          isFirst={i === 0}
          isLast={i === SCORE_SCALE - 1}
          uuid={question.uuid}
          index={i}
        />
      );
    }

    return (
      <div key={question.uuid}>
        <h6>{question.description}</h6>
        
          <Form.Label className="d-none d-md-inline assessment-question-label">
            Disagree
          </Form.Label>
          {radioButtons.map((button) => {
            return button;
          })}

          <Form.Label className="d-none d-md-inline assessment-question-label">
            Agree
          </Form.Label>

        <Row className="d-md-none d-sm-block d-xs-block" xs={12} sm={12}>
          <Col md={0} className="d-inline col-2">
            <label>Disagree</label>
          </Col>
          <Col md={0} className="d-inline col-8"></Col>
          <Col md={0} className="d-inline col-2">
            <label>Agree</label>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Container className="mb-3">
      {questionList.map((question) => {
        return questionRow(question);
      })}
    </Container>
  );
}
