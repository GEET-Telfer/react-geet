import QuestionRadioButton from "./QuestionRadioButton";

export default function QuestionList(props) {
    const { questionList, componentName } = props;

    const questionRow = (question) => {
        const radioButtons = [];
        for (let i = 0; i < parseInt(question.scoring); i++) {
            radioButtons.push(
            <QuestionRadioButton
                componentName={componentName}
                key={`${question.id}-${i}`}
                isFirst={i === 0}
                isLast={i === parseInt(question.scoring) - 1}
                id={question.id}
                index={i}
            />)
        }

        return (
            <div align="center" key={question.id} >
                <h6 >{question.description}</h6>
                {
                    radioButtons.map((button) => {
                        return button;
                    })
                }

            </div>
        )
    }

    return (
        <div>
            {
                questionList.map((question) => {
                    return questionRow(question);
                })
            }
        </div>
    )
}