import { useState } from "react";
import { Instruction, MetaQuestionList, Result } from "./components";
import Container from "react-bootstrap/Container";
import "./styles/styles.css";
import { ProgressCtxProvider } from "../../context/ProgressContext";
import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import geetLogo from "../../assets/geet-logo-large.png";

export default function Asssessment() {
  const [cookies, setCookie] = useCookies();

  const [consent, setConsent] = useState(cookies["assessment-consent"]);
  const [complete, setComplete] = useState(false);

  const breadcrumbItems = [
    { title: "Home", link: process.env.REACT_APP_HOST },
    { title: "Microlearning directory", link: `${process.env.REACT_APP_HOST}/${process.env.REACT_APP_MICRO_LEARNING_MODULE_LIST_ROUTE}` },
  ];

  return (
    <ProgressCtxProvider>
      <Header breadcrumbItems={breadcrumbItems} title={"Scorecard"} />

      <img className={"sticky-icon"} src={geetLogo} alt="GEET LOGO" />

      <div>
      <Container align="center" className={"container-result"} fluid="true">
        {!consent && (
          <Instruction hasConsent={consent} setConsent={setConsent} />
        )}
        {consent && !complete && (
          <MetaQuestionList
            hasConsent={consent}
            hasComplete={complete}
            setComplete={setComplete}
          />
        )}
      </Container>
      </div>
      <Container align="center" className={"container-result"} fluid={"true"}>
        {consent && complete && (
          <Result
            hasConsent={consent}
            hasComplete={complete}
            setComplete={setComplete}
          />
        )}
      </Container>
    </ProgressCtxProvider>
  );
}
