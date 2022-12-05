import { Route } from "react-router-dom";
import Asssessment from "../pages/Assessment";

const AssessmentRoute = [
  <Route key="survey" path={`/${process.env.REACT_APP_ASSESSMENT_ROUTE}`} element={<Asssessment />} />,
];

export default AssessmentRoute;
