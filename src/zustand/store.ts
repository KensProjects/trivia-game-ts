import { create } from "zustand";
import { baseUrl } from "../utils/baseurl";
import { GameSettings, TriviaStoreTypes } from "../types/types";


const initialPoints = 0
const initialQuestionIndex = 0
const initialNumberOfGameQuestions = '10'
const initialGameSettings: GameSettings = { difficulty: "medium", category: 'film' }

export const triviaStore = create<TriviaStoreTypes>()((set, get) => ({
    points: initialPoints,
    gameSettings: initialGameSettings,
    questionIndex: 0,
    gameRunning: false,
    gameEnded: false,
    resetPoints: () => set({ points: initialPoints }),
    toggleGameRunning: () => set((state) => ({ gameRunning: !state.gameRunning })),
    toggleGameEnded: () => {
        set((state) => ({ gameEnded: !state.gameEnded }))
    },

    increaseQuestionIndex: () => {
        set((state) => ({ questionIndex: state.questionIndex + 1 }))
        const questionsLeft = get().questionIndex
        const endOfQuestions = questionsLeft > 9
        if (endOfQuestions) {
            set((state) => ({ gameEnded: !state.gameEnded }))
        }
    },
    resetQuestionIndex: () => set({ questionIndex: initialQuestionIndex }),
    increasePoints: () => set((state) => ({ points: state.points + 1 })),
    setGameSettings: ({ difficulty, category }) => set(() => ({
        gameSettings: { difficulty, category }
    })),

    startGame: async () => {
        const questionIndex = get().questionIndex
        const gameNotatBeginnning = questionIndex > initialQuestionIndex

        if (gameNotatBeginnning) {
            get().resetQuestionIndex()
        }

        try {
            const difficulty = get().gameSettings.difficulty
            const category = get().gameSettings.category

            //category 23 is history,17 is science and nature ,11 is film

            let transcribledCategory = ""
            if (category === 'film') transcribledCategory = '11'
            if (category === 'science') transcribledCategory = '27'
            if (category === 'history') transcribledCategory = '23'

            const res = await fetch(`${baseUrl}?amount=${initialNumberOfGameQuestions}&category=${transcribledCategory}&difficulty=${difficulty}&type=multiple`)
            if (!res.ok) {
                throw new Error("Game unavailable!")
            } else {
                const data = await res.json()
                return data.results
            }

        } catch (error) {
            console.error(error)
        }
    },
}))