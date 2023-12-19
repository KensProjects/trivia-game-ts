import useFetchQuestions from "../../hooks/useFetchQuestions"
import { TriviaStoreTypes } from "../../types/types"
import { triviaStore } from "../../zustand/store"

export default function Question() {

    const increasePoints = triviaStore((state: TriviaStoreTypes) => state.increasePoints)
    const questionIndex = triviaStore((state: TriviaStoreTypes) => state.questionIndex)
    const increaseQuestionIndex = triviaStore((state: TriviaStoreTypes) => state.increaseQuestionIndex)
    const toggleGameRunning = triviaStore((state: TriviaStoreTypes) => state.toggleGameRunning)
    const gameEnded = triviaStore((state: TriviaStoreTypes) => state.gameEnded)
    const toggleGameEnded = triviaStore((state: TriviaStoreTypes) => state.toggleGameEnded)

    const outOfQuestions = questionIndex > 9

    const { data: questions } = useFetchQuestions()

    const currentQuestion = questions && questions[questionIndex]

    const currentQuestionIncorrectAnswers = currentQuestion && currentQuestion.incorrect_answers

    const currentQuestionAnswerChoices = currentQuestionIncorrectAnswers && [...currentQuestionIncorrectAnswers, currentQuestion.correct_answer].sort(() => 0.5 - Math.random())

    function handleIncrease(answerChosen: string) {
        if (!currentQuestion) return

        const correctAnswerChosen = currentQuestion.correct_answer === answerChosen
        
        if (correctAnswerChosen) {
            increasePoints()
        }

        increaseQuestionIndex();

        if (outOfQuestions) {
            toggleGameRunning()
            toggleGameEnded()
        }
    }
    if (gameEnded) return null

    return (
        <div className="flex flex-col justify-center items-between h-full w-full gap-4">
            <h2 className="h-auto text-center text-xl">Question {questionIndex + 1}</h2>
            <h2 className="h-auto text-center text-xl">{currentQuestion?.question}</h2>
            <ul className="w-full h-full flex flex-col justify-center items-center gap-4 px-4">{currentQuestionAnswerChoices && currentQuestionAnswerChoices.map((choice:string, idx:number) => {

                return <li
                    key={choice}
                    className={`hover:bg-gray-200 cursor-pointer w-full h-auto text-lg`}
                    onClick={() => { handleIncrease(choice) }}>
                    <span>{idx + 1}:</span> {choice}
                </li>
            })}
            </ul>
        </div>
    )
}
