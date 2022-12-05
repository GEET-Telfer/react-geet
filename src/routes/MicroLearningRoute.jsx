import { Route } from "react-router-dom";
import MicroLearning from "../pages/MicroLearning";
import MicroLearningList from "../pages/MicroLearningList";

const MicroLearningRoute = [
  <Route key="training-module" path={`/${process.env.REACT_APP_MICRO_LEARNING_MODULE_ROUTE}`} element={<MicroLearning />} />,
  <Route key="training-modules" path={`/${process.env.REACT_APP_MICRO_LEARNING_MODULE_LIST_ROUTE}`} element={<MicroLearningList />} />,
];

export default MicroLearningRoute;
