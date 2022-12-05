import { Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";


const AdminDashboardRoute = [
    <Route key="admin-dashboard" path={`/${process.env.REACT_APP_ADMIN_ROUTE}`} element={<AdminDashboard />} />
]

export default AdminDashboardRoute;