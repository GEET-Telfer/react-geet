import { Route } from "react-router-dom";
import Resources from "../pages/Resources";

const ResourceRoute = [
  <Route key="resources" path={`/${process.env.REACT_APP_RESOURCE_ROUTE}`} element={<Resources />} />
];

export default ResourceRoute;
