import { useState } from 'react';
import { Instruction, MetaQuestionList, Result } from './components';
import Container from 'react-bootstrap/Container';
import "./styles/styles.css";
import { ProgressCtxProvider } from '../../context/ProgressContext';
import { useCookies } from 'react-cookie';
export default function Asssessment() {
    const [cookies, setCookie] = useCookies();

    const [consent, setConsent] = useState(cookies['assessment-consent']);
    const [complete, setComplete] = useState(false);

    return (
        <ProgressCtxProvider>
            <Container align="center">
                <Instruction hasConsent={consent} setConsent={setConsent} />
                <MetaQuestionList
                    hasConsent={consent}
                    hasComplete={complete}
                    setComplete={setComplete} />
            </Container>
            <Container align="center" className={"container-result"} fluid={"xxl"}>
                <Result
                    hasConsent={consent}
                    hasComplete={complete}
                    setComplete={setComplete} />

            </Container>
        </ProgressCtxProvider>
    )
}