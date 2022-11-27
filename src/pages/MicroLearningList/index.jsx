import MicroLearningSnippet from "./components/MicroLearningSnippet";



export default function MicroLearningList(props) {

    const list = [
        'id=123',
        'id=456',
        'id=789'
    ];

    return(
        <div>
            {
                list.map((item) => {
                    return <MicroLearningSnippet key={item} paramsString={item} />
                })
            }
        </div>
    )
}