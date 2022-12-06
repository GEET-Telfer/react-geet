import { Row, Col, Ratio, Stack } from "react-bootstrap";
import Article from "../../MicroLearning/components/Article";
/**
 * Assessment Snippet in MicroLearning Directory
 */
export default function AssessmentSnippet() {

    return(
        <Row className={"mb-3 ml-2 snippet"} >
        <Col xs={12} md={{offset: 2, span:4}}>
          <Ratio aspectRatio={"4x3"}>
            <a href={`${process.env.REACT_APP_HOST}/${process.env.REACT_APP_ASSESSMENT_ROUTE}`}>
              <img 
                src="https://archive.researchworld.com/wp-content/uploads/2017/09/fundamentals-of-questionnaire-writing.jpg"
                alt="assessment"
                className='img-fluid rounded'
                />
              </a>
          </Ratio>
        </Col>
        <Col xs={12} md={5}>
          <Stack gap={2}>
              <a href={`${process.env.REACT_APP_HOST}/${process.env.REACT_APP_ASSESSMENT_ROUTE}`}>
                <h4>{"Survey"}</h4>
              </a>
              {/* <small>Estimation: {"15 minutes"}</small> */}
              <p
                style={{
                  whiteSpace: "breakSpace",
                  maxHeight: "170px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                }}
              ><Article /></p>
          </Stack>
        </Col>
      </Row>
    )
}