import { Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";


const AdminDashboardRoute = [
    <Route key="react-admin" path="/react-admin" element={<AdminDashboard />} />
]

export default AdminDashboardRoute;