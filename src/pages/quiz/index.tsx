import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QuizType } from "@/types/quiz";
import Ring from "@/components/ui/Ring";
import QuizBox from "@/components/QuizBox";
import { AnswerType } from "@/types/quiz";
import { useQuizStore } from "@/store/useQuizStore";

// SSR 방식으로 사용시 data 패칭이 오래 걸리는 문제 때문에
// (기본)초기 렌더링은 SSG로 처리하고, 이후 데이터 패칭은 CSR로 처리. 이전 페이지에서 프리페치 처리떄문에 데이터 패칭 빠르게 요청
export default function Quiz() {
  const router = useRouter();
  const { difficulty } = router.query;
  const [questions, setQuestions] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerType | null>(null);
  const [answerList, setAnswerList] = useState<AnswerType[]>([]);
  const { setStoreQuizList, setStoreAnswerList } = useQuizStore();

  // 선택 안하면 다음 문제로 넘어가지 않게 처리
  // 마지막 문제 선택시 answerList 저장 후 결과 페이지로 이동
  const moveToNextStep = () => {
    if (currentQuestion < questions.length - 1 && currentAnswer) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerList((prev) => [...prev, currentAnswer]);
      setCurrentAnswer(null);
    } else if (currentQuestion === questions.length - 1 && currentAnswer) {
      setStoreQuizList(questions);
      setStoreAnswerList([...answerList, currentAnswer]);
      router.push("/result");
    }
  };

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/generateQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ difficulty }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "퀴즈를 가져오는데 실패했습니다");
      }

      const data = await response.json();
      setQuestions(data.data);
      setLoading(false);
    } catch (err) {
      console.error("퀴즈 데이터 로딩 오류:", err);
    }
  };

  useEffect(() => {
    // 쿼리 파라미터가 로드된 후에만 API 호출
    if (router.isReady) {
      fetchQuizQuestions();
    }
  }, [router.isReady]);

  useEffect(() => {
    router.prefetch("/result");
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col flex-grow">
      <h2 className="text-2xl font-bold mb-4">경제 퀴즈</h2>

      {loading ? (
        <div className="flex flex-grow flex-col items-center justify-center">
          <Ring size={100} color="#fad729" />
          <p className="text-lg mt-4 font-bold">퀴즈를 생성하는 중입니다...</p>
        </div>
      ) : (
        <div>
          {questions.length > 0 && (
            <>
              <QuizBox data={questions[currentQuestion]} setCurrentAnswer={setCurrentAnswer} />
              <button className="bg-[rgb(255,151,1)] text-white px-4 py-2 rounded" onClick={moveToNextStep}>
                {currentQuestion < questions.length - 1 ? "다음 문제" : "결과 보기"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
