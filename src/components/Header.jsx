import { Container, Row, Col, Stack } from "react-bootstrap";
import geetLogo from "../assets/geet-logo.png";
// import headerBackground from "../assets/header-bg.png";

import "./styles.css";

export default function Header(props) {
  const { breadcrumbItems, title } = props;

  return (
    <div className={"breadcrumb-header mb-3"}>
      <Container>
        <Row>
          <Col md={1} align="center">
            <a href={process.env.REACT_APP_HOST}>
              <img src={geetLogo} alt="geet-logo" />
            </a>
          </Col>

          <Col>
            <Stack>
              <div>
                {breadcrumbItems.map((item) => {
                  return (
                    <a key={item.link} href={item.link}>
                      {item.title}&nbsp;/ &nbsp;
                    </a>
                  );
                })}
              </div>
            </Stack>

            <Stack>
              <h2>{title}</h2>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
