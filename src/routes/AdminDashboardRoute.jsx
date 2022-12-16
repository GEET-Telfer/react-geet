import { Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import MicroLearningPreview from "../pages/MicroLearningPreview";


const AdminDashboardRoute = [
    <Route key="admin-dashboard" path={`/${process.env.REACT_APP_ADMIN_ROUTE}`} element={<AdminDashboard />} />,
    <Route key="microlearning-preview" path={`/${process.env.REACT_APP_MICRO_LEARNING_MODULE_PREVIEW}`} element={<MicroLearningPreview />} />
]

export default AdminDashboardRoute;