export interface MockExamResult {
  mockExamId: string;
  score: number;
  correct_answers: number;
  total_answers: number;
  totalTime: number;
}

export interface MockExamOption {
  id: string;
  option_text: string;
}

export interface Question {
  id: string;
  statement: string;
  explanation?: string | null;
  subject: string;
  topic: string;
  difficulty: string;
  options: MockExamOption[];
}

export interface SubmitAnswerPayload {
  question_id: string;
  selected_option_id: string;
  response_time: number;
}

export interface AnsweredQuestion {
  index: number;
  correct: boolean;
}

export interface ReviewItem {
  question_id: string;
  statement: string;
  explanation: string;
  topic: string;
  subject: string;
  difficulty: string;
  selected_option: string | null;
  correct_option: string | null;
  is_correct: boolean;
}

export interface SubmitAnswerInput {
  mockExamId: string;
  payload: SubmitAnswerPayload;
}
