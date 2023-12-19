import useFetchQuestions from '../../hooks/useFetchQuestions'
import { TriviaStoreTypes } from '../../types/types'
import { triviaStore } from '../../zustand/store'

export default function EndingScreen() {

  const points = triviaStore((state: TriviaStoreTypes) => state.points)
  const toggleGameRunning = triviaStore((state: TriviaStoreTypes) => state.toggleGameRunning)
  const toggleGameEnded = triviaStore((state: TriviaStoreTypes) => state.toggleGameEnded)
  const resetQuestionIndex = triviaStore((state: TriviaStoreTypes) => state.resetQuestionIndex)
  const resetPoints = triviaStore((state: TriviaStoreTypes) => state.resetPoints)

  const badScore = points <= 5
  const goodScore = points >= 6

  const endingScreenButtonStype = "flex h-16 py-1 px-8 text-white rounded-md items-center justify-center text-sm sm:text-lg"
  const endofGameMessage = "text-center flex justify-center items-center"

  const { refetch: restartGame } = useFetchQuestions()

  function restart() {
    resetPoints()
    resetQuestionIndex()
    toggleGameEnded()
    restartGame()
  }
  function resetSettings() {
    resetPoints()
    toggleGameRunning()
    toggleGameEnded()
    resetQuestionIndex()
  }

  return (
    <div className='gap-4 text-xl flex flex-col items-center justify-center h-full w-full p-1 sm:p-20' id='ending-screen'>
      {badScore && <span className={endofGameMessage}>Sorry, your score is {points}/10. Please try to get a higher score next time!</span>}
      {goodScore && <span className={endofGameMessage}>Excellent work! Your score is {points}/10! You really know your stuff!</span>}
      <span className='text-center text-lg'>Want to play another round?</span>
      <div id="reset-button-group" className='flex justify-center items-center gap-4'>
        <button className={`${endingScreenButtonStype } bg-purple-400`} onClick={() => restart()}>Reset Game</button>
        <button className={`${endingScreenButtonStype} bg-orange-400`} onClick={() => resetSettings()}>Change Settings</button>
      </div>

    </div>
  )
}
