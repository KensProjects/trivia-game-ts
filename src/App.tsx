import GameWindow from "./components/gameComponents/GameWindow";
import GameSettingSetter from "./components/gameComponents/GameSettingSetter";
import Navbar from "./components/Navbar";
import { triviaStore } from "./zustand/store";
import { TriviaStoreTypes } from "./types/types";

export default function App() {

  const gameRunning = triviaStore((state: TriviaStoreTypes) => state.gameRunning)

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center bg-blue-500 gap-4" id="app">
      <Navbar />
      {gameRunning ?<GameWindow />: <GameSettingSetter />}
    </div>
  )
}
