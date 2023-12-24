import type { ChangeEvent, FormEvent } from "react"
import useFetchQuestions from "../../hooks/useFetchQuestions"
import toast from "react-hot-toast"
import { categoriesArray, difficultiesArray } from "../../utils/selectProps"
import type { Categories, Difficulties, TriviaStoreTypes } from "../../types/types"
import { triviaStore } from "../../zustand/store"

export default function GameSettingSetter() {
    const gameSettings = triviaStore((state: TriviaStoreTypes) => state.gameSettings)
    const setGameSettings = triviaStore((state: TriviaStoreTypes) => state.setGameSettings)
    const gameRunning = triviaStore((state: TriviaStoreTypes) => state.gameRunning)
    const toggleGameRunning = triviaStore((state: TriviaStoreTypes) => state.toggleGameRunning)

    const { refetch: getQuestions, isLoading, error } = useFetchQuestions()

    const selectStyle = "border border-black flex w-32 h-fit justify-center items-center text-center cursor-pointer"
    const settingsFieldStyle = "flex w-full flex flex-col sm:flex-row justify-center items-center gap-2"

    async function handleFetchQuestions(e: FormEvent) {
        e.preventDefault()
        toast.promise(getQuestions(), {
            loading: 'Loading',
            success: 'Success',
            error: JSON.stringify(error)
        })
        toggleGameRunning()
    }


    function handleDifficultyUpdate(e: ChangeEvent<HTMLSelectElement>) {
        setGameSettings({ ...gameSettings, difficulty: e.target.value as Difficulties })
    }
    function handleCategoryUpdate(e: ChangeEvent<HTMLSelectElement>) {
        setGameSettings({ ...gameSettings, category: e.target.value as Categories })
    }

    if (gameRunning) return null

    return (
        <form onSubmit={handleFetchQuestions} className="flex flex-col w-11/12 sm:w-5/12 h-fit gap-1 justify-between items-center rounded-2xl border border-black px-5 py-2 bg-gray-100">
            <h2 className="underline underline-offset-2 text-xl mb-2">Settings</h2>
            <div id="selection-container" className="w-full flex flex-col justify-between items-between gap-4 mb-4">

                <div className={settingsFieldStyle}>
                    <label htmlFor="difficulty-selector"> Difficulty</label>
                    <select id="difficulty-selector" name="difficulty" value={gameSettings.difficulty} onChange={handleDifficultyUpdate} className={selectStyle}>
                        {difficultiesArray.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={settingsFieldStyle}>
                    <label htmlFor="category-selector"> Category</label>
                    <select id="category-selector" name="category" value={gameSettings.category} onChange={handleCategoryUpdate} className={selectStyle}>
                        {categoriesArray.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit" className={`w-32 h-8 text-black rounded-lg  ${!isLoading ? "bg-green-400 hover:bg-green-300 " : "bg-gray-300 "} duration-75 ease-in-out`} disabled={isLoading}>Submit</button>

        </form>
    )
}
