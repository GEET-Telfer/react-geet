import React from "react";
import { Routes } from "react-router-dom";
import AdminDashboardRoute from "./AdminDashboardRoute";
import AssessmentRoute from "./AssessmentRoute";
import MicroLearningRoute from "./MicroLearningRoute";
import ResourceRoute from "./ResourceRoute";


export default function Router() {
    return (
        <Routes>
            { AssessmentRoute }
            { AdminDashboardRoute }
            { MicroLearningRoute }
            { ResourceRoute }
        </Routes>
    );
}