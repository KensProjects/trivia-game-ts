import { useQuery } from "@tanstack/react-query"
import { triviaStore } from "../zustand/store"
import { TriviaStoreTypes } from "../types/types"

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
