import { Route } from "react-router-dom";
import MicroLearning from "../pages/MicroLearning";
import MicroLearningList from "../pages/MicroLearningList";

const MicroLearningRoute = [
  <Route key="react-micro-learning" path="/react-micro-learning" element={<MicroLearning />} />,
  <Route key="react-micro-learning-list" path="/react-micro-learning-list" element={<MicroLearningList />} />,
];

export default MicroLearningRoute;
