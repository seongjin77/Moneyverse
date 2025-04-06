import { QuizType } from "@/types/quiz";
import { useEffect, useState } from "react";

type AnswerType = {
  questionId: number;
  answer: string;
};

export default function QuizBox({
  data,
  setCurrentAnswer,
}: {
  data: QuizType;
  setCurrentAnswer: (answer: AnswerType) => void;
}) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedKey(answer);
    setCurrentAnswer({
      questionId: data.id,
      answer,
    });
  };

  useEffect(() => {
    setSelectedKey(null);
  }, [data.id]);

  return (
    <div className="mb-6 p-4 border rounded shadow">
      <h3 className="font-bold mb-2">문제: {data.question}</h3>
      <ul className="mb-4">
        {Object.entries(data.options).map(([key, value], index) => (
          <li
            key={key}
            className={`mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedKey === key
                ? "bg-[rgb(255,151,1)] text-white font-medium shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleAnswer(key)}
          >
            <div className="flex items-center">
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                  selectedKey === key ? "bg-white text-[rgb(255,151,1)]" : "bg-white text-gray-700"
                }`}
              >
                {index + 1}
              </span>
              {value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
