import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type QuizOption = {
  a: string;
  b: string;
  c: string;
  d: string;
};

type QuizQuestion = {
  question: string;
  options: QuizOption;
  explanation: string;
  correctAnswer: string;
};

export default function Quiz() {
  const router = useRouter();
  const { difficulty } = router.query;
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 쿼리 파라미터가 로드된 후에만 API 호출
    if (router.isReady) {
      fetchQuizQuestions();
    }
  }, [router.isReady]);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

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
    } catch (err) {
      console.error("퀴즈 데이터 로딩 오류:", err);
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">경제 퀴즈</h1>

      {loading && <p>퀴즈를 생성하는 중입니다...</p>}

      {error && (
        <div className="bg-red-100 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchQuizQuestions}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            다시 시도
          </button>
        </div>
      )}

      {!loading && !error && questions.length > 0 && (
        <div>
          {questions.map((q, index) => (
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
