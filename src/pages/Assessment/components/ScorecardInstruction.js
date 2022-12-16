import { Fragment } from "react";

export default function ScorecardInstruction() {

  const steps = [
    "Review each of the seven components of the GEET+ scorecard.",
    "Evaluate the program and course using the 35 assessment criteria.",
    "Your responses will be tallied automatically and sent by email.",
    "Construct an action plan to address gaps identified in the feedback."
  ]

  return (
    <Fragment>
      <h2 className={"mb-3"} align="center">
        Instruction
      </h2>
      <h6 align="center">
        GEET+ Scorecard© provides assessment criteria against which to measure
        entrepreneurship programs and courses. The assessment can inform action
        plans to strengthen the relevance and quality of policies and practices.
      </h6>
      <hr />
      <div align="left">
        <span>STEPS:</span>
      </div>
      <ol align="left" style={{marginLeft: "15px"}}>
        {
          steps.map((step, index) => {
            return(<li key={index}>{step}</li>)
          })
        }
      </ol>
    </Fragment>
  );
}
