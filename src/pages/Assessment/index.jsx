import { useState, useEffect, Fragment, useRef } from 'react';
import { Instruction, QuestionList, Result } from './components';

export default function Asssessment() {


    const toggleInstructionVisibility = useRef(true);
    const toggleQuestionListVisibility = useRef(false);
    const toggleResultVisibility = useRef(false);

    return (
        <Fragment>
            <Instruction visibilty={toggleInstructionVisibility} />
            <QuestionList visibilty={toggleQuestionListVisibility} />
            <Result visibilty={toggleResultVisibility} />
        </Fragment>
    )
}