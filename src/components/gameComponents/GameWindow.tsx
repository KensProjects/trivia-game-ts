import useFetchQuestions from "../../hooks/useFetchQuestions"
import Question from "./Question"
import EndingScreen from "./EndingScreen"
import { triviaStore } from "../../zustand/store"
import { TriviaStoreTypes } from "../../types/types"

export default function GameWindow() {

  const gameWindowStyle = "flex flex-col justify-start items-start w-full lg:w-10/12 h-fit border border-gray-800 bg-white p-1"

  const gameEnded = triviaStore((state: TriviaStoreTypes) => state.gameEnded)
  const gameRunning = triviaStore((state: TriviaStoreTypes) => state.gameRunning)

  const { isFetching } = useFetchQuestions()

  if (isFetching) return <div className={gameWindowStyle}></div>

  return (
    <div className={gameWindowStyle}>
      {gameRunning && <Question />}
      {gameEnded && <EndingScreen />}
    </div>
  )
}


