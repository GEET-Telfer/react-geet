import { useState } from "react";
import { Instruction, MetaQuestionList, Result } from "./components";
import Container from "react-bootstrap/Container";
import "./styles/styles.css";
import { ProgressCtxProvider } from "../../context/ProgressContext";
import { useCookies } from "react-cookie";
import Header from "../../components/Header";

export default function Asssessment() {
  const [cookies, setCookie] = useCookies();

  const [consent, setConsent] = useState(cookies["assessment-consent"]);
  const [complete, setComplete] = useState(false);

  const breadcrumbItems = [
    { title: "Home", link: process.env.REACT_APP_HOST },
    { title: "Training Modules", link: `${process.env.REACT_APP_HOST}/training-modules` },
  ];

  return (
    <ProgressCtxProvider>
      <Header breadcrumbItems={breadcrumbItems} title={"Surveys"} />
      <div>
      <Container align="center" className={"container-result"} fluid={"xxl"}>
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
      <Container align="center" className={"container-result"} fluid={"xxl"}>
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
