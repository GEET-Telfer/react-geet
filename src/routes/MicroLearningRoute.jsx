import { Route } from "react-router-dom";
import MicroLearning from "../pages/MicroLearning";

const MicroLearningRoute = [
  <Route key="react-micro-learning" path="/react-micro-learning" element={<MicroLearning />} />,
  <Route key="react-micro-learning-1" path="/react-micro-learning/:id" element={<MicroLearning />} />,
];

export default MicroLearningRoute;
