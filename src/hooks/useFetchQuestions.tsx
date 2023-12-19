import { useQuery } from "@tanstack/react-query"
import { triviaStore, type TriviaStoreTypes } from "../zustand/store"

export default function useFetchQuestions() {

  const startGame = triviaStore((state: TriviaStoreTypes) => state.startGame)

  return useQuery({
    queryKey: ["questions"],
    queryFn: () => startGame(),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })
}
