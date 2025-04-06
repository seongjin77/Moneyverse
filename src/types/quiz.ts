export interface QuizType {
  id: number;
  question: string;
  options: {
    [key: string]: string;
  };
  explanation: string;
  correctAnswer: string;
}

export interface AnswerType {
  questionId: number;
  answer: string;
}
