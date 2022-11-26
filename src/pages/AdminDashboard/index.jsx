import { useState, useEfeect, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CreateQuestion, ViewQuestions, CreateMicroLearningModule, ViewMicroLearnings } from './components';
import { useWindowDimensions } from "../../hooks";

export default function AdminDashboard() {

    const keyList = [
        "assessment-view",
        "assessment-create",
        "micro-learning-view",
        "micro-learning-create"
    ];
    const { width } = useWindowDimensions();

    const [activeKey, setActiveKey] = useState("assessment-view");

    const handleSelect = (eventKey) => {
        for (const key of keyList) {
            if (eventKey === key) {
                setActiveKey(key);
            }
        }
    }

    useEffect(() => {
        console.log(activeKey);
    }, [activeKey]);

    return (
        <Container fuild="true" style={{ width: width }}>
            <h1>AdminDashboard</h1>
            <Row>
                <Col sx={{ span: 2 }} md={{ span: 2 }}>
                    <Nav variant="pills" onSelect={handleSelect}>
                        <NavDropdown title="Assessment" id="nav-dropdown-assessment">
                            <NavDropdown.Item eventKey="assessment-view">View</NavDropdown.Item>
                            <NavDropdown.Item eventKey="assessment-create">Create</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Micro Learning" id="nav-dropdown-micro-learning">
                            <NavDropdown.Item eventKey="micro-learning-view">View</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="micro-learning-create">Create</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Col>
                <Col sx={{ span: 8 }} md={{ span: 8 }}>
                    <h1>Placeholder</h1>
                    <Container>
                        <CreateQuestion tag="assessment-create" activeKey={activeKey} />
                        <ViewQuestions tag="assessment-view" activeKey={activeKey} />
                        <CreateMicroLearningModule tag="micro-learning-create" activeKey={activeKey} />
                        <ViewMicroLearnings tag="micro-learning-view" activeKey={activeKey} />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}