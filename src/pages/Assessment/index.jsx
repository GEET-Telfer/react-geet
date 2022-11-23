import { useState } from 'react';
import { Instruction, MetaQuestionList, Result } from './components';
import Container from 'react-bootstrap/Container';
import "./styles/styles.css";
import { ProgressCtxProvider } from '../../context/ProgressContext';

export default function Asssessment() {


    const [flagDisplayInstruction, setFlagDisplayInstruction] = useState(false);
    const [flagDisplayQuestionList, setFlagDisplayQuestionList] = useState(true);
    const [flagDisplayResult, setFlagDisplayResult] = useState(false);


    return (
        <Container>
            <ProgressCtxProvider>
                <Instruction visibility={flagDisplayInstruction} />
                <MetaQuestionList visibility={flagDisplayQuestionList} />
                <Result visibility={flagDisplayResult} />
            </ProgressCtxProvider>
        </Container>
    )
}