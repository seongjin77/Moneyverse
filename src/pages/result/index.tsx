import { useQuizStore } from "@/store/useQuizStore";

export default function Result() {
  // 🎯 권장: 선택자 방식
  const quizList = useQuizStore((state) => state.storeQuizList);
  const answerList = useQuizStore((state) => state.storeAnswerList);

  console.log("quizList", quizList);
  console.log("answerList", answerList);

  return <div>Result</div>;
}
