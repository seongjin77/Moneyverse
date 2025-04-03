export interface QuizType {
  question: string;
  options: {
    [key: string]: string;
  };
  explanation: string;
  correctAnswer: string;
}
