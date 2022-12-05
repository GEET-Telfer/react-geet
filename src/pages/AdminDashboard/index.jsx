import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Header from "../../components/Header";

import {
  CreateQuestion,
  ViewQuestions,
  CreateMicroLearningModule,
  ViewMicroLearnings,
} from "./components";

import { useWindowDimensions } from "../../hooks";
import { AdminQuestionCtxProvider } from "../../context/AdminQuestionContext";

import "./styles/styles.css";

/**
 * Entry point for Admin Dashboard
 */
export default function AdminDashboard() {
  const keyList = [
    "assessment-view",
    "assessment-create",
    "micro-learning-view",
    "micro-learning-create",
  ];
  const { width } = useWindowDimensions();

  const [activeKey, setActiveKey] = useState("assessment-view");

  const handleSelect = (eventKey) => {
    // update activeKey on select
    for (const key of keyList) {
      if (eventKey === key) setActiveKey(key);
    }
  };

  const breadcrumbItems = [
    { title: "Home", link: process.env.REACT_APP_HOST },
  ];

  return (
    <AdminQuestionCtxProvider>
      <Header breadcrumbItems={breadcrumbItems} title={"Admin Dashboard"} />
      
      <Container fuild="true" style={{ width: width }}>
        <Row className={"element-control"}>
          {/* Nav dropdown control on Admin pandel display */}
          <Col sx={{ span: 2 }} md={{ span: 2 }}>
            <Nav variant="pills" onSelect={handleSelect}>
              {/* Assessment control */}
              <NavDropdown title="Assessment" id="nav-dropdown-assessment">
                <NavDropdown.Item eventKey="assessment-view">
                  View
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="assessment-create">
                  Create
                </NavDropdown.Item>
              </NavDropdown>
              {/* Micro-learning module control */}
              <NavDropdown
                title="Micro Learning"
                id="nav-dropdown-micro-learning"
              >
                <NavDropdown.Item eventKey="micro-learning-view">
                  View
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="micro-learning-create">
                  Create
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Col>
          {/* Admin pandel content, which is toggled by dropdown buttons */}
          <Col sx={{ span: 8 }} md={{ span: 8 }}>
            <Container>
              {activeKey === "assessment-create" && <CreateQuestion />}

              {activeKey === "assessment-view" && <ViewQuestions />}

              {activeKey === "micro-learning-create" && (
                <CreateMicroLearningModule />
              )}

              {activeKey === "micro-learning-view" && <ViewMicroLearnings />}
            </Container>
          </Col>
        </Row>
      </Container>
    </AdminQuestionCtxProvider>
  );
}
