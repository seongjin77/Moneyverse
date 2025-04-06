import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QuizType } from "@/types/quiz";
import Ring from "@/components/ui/Ring";

// SSR 방식으로 사용시 data 패칭이 오래 걸리는 문제 때문에
// (기본)초기 렌더링은 SSG로 처리하고, 이후 데이터 패칭은 CSR로 처리. 이전 페이지에서 프리페치 처리떄문에 데이터 패칭 빠르게 요청
export default function Quiz() {
  const router = useRouter();
  const { difficulty } = router.query;
  const [questions, setQuestions] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(true);

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
      //fetchQuizQuestions();
    }
  }, [router.isReady]);

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
          {questions.length > 0 &&
            questions.map((q: QuizType, index: number) => (
              <div key={index} className="mb-6 p-4 border rounded shadow">
                <h2 className="font-bold mb-2">
                  문제 {index + 1}: {q.question}
                </h2>
                <ul className="mb-4">
                  <li className="mb-1">A. {q.options.a}</li>
                  <li className="mb-1">B. {q.options.b}</li>
                  <li className="mb-1">C. {q.options.c}</li>
                  <li className="mb-1">D. {q.options.d}</li>
                </ul>
                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-500">
                    정답 보기
                  </summary>
                  <p className="mt-2">
                    <strong>정답:</strong> {q.correctAnswer}
                  </p>
                  <p className="mt-1">
                    <strong>설명:</strong> {q.explanation}
                  </p>
                </details>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
