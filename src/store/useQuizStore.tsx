import { create } from "zustand";
import { QuizType, AnswerType } from "@/types/quiz";

interface QuizStore {
  storeQuizList: QuizType[];
  storeAnswerList: AnswerType[];
  setStoreQuizList: (quizList: QuizType[]) => void;
  setStoreAnswerList: (answerList: AnswerType[]) => void;
  resetStoreQuizStore: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  storeQuizList: [],
  storeAnswerList: [],
  setStoreQuizList: (quizList: QuizType[]) => {
    set((state) => ({
      ...state,
      storeQuizList: quizList,
    }));
  },
  setStoreAnswerList: (answerList: AnswerType[]) => {
    set((state) => ({
      ...state,
      storeAnswerList: answerList,
    }));
  },
  resetStoreQuizStore: () => {
    set((state) => ({
      ...state,
      storeQuizList: [],
      storeAnswerList: [],
    }));
  },
}));
