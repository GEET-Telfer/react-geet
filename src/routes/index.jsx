import React from "react";
import { Routes } from "react-router-dom";
import AdminDashboardRoute from "./AdminDashboardRoute";
import AssessmentRoute from "./AssessmentRoute";
import MicroLearningRoute from "./MicroLearningRoute";


export default function Router() {
    return (
        <Routes>
            { AssessmentRoute }
            { AdminDashboardRoute }
            { MicroLearningRoute }
        </Routes>
    );
}