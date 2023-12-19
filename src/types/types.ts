
export type Difficulties = "easy" | "medium" | "hard"

export type Categories = 'film' | 'science' | 'history'

export type GameSettings = {
    difficulty?: Difficulties, category?: Categories
}

export type QuestionType = {
    difficulty?: Difficulties,
    category?: Categories,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type TriviaStoreTypes = {
    points: number,
    increasePoints: () => void,
    resetPoints: () => void,
    gameSettings: GameSettings,
    setGameSettings: ({ difficulty, category }: GameSettings) => void,
    questionIndex: number,
    increaseQuestionIndex: () => void,
    resetQuestionIndex: () => void,
    gameRunning: boolean,
    gameEnded: boolean,
    toggleGameRunning: () => void,
    toggleGameEnded: () => void,
    startGame: () => Promise<QuestionType[]>,
}