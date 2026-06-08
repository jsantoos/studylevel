import api from "@/services/api/api";

import {
  Question,
  SubmitAnswerPayload,
} from "@/types/mock-exam";

export async function getMockExamQuestions(
  mockExamId: string,
): Promise<Question[]> {
  const response = await api.get(
    `/mock-exams/${mockExamId}/questions`,
  );

  return response.data;
}

export async function submitAnswer(
  mockExamId: string,
  payload: SubmitAnswerPayload,
) {
  const response = await api.post(
    `/mock-exams/${mockExamId}/answer`,
    payload,
  );

  return response.data;
}

export async function finishMockExam(
  mockExamId: string,
) {
  const response = await api.post(
    `/mock-exams/${mockExamId}/finish`,
  );

  return response.data;
}

export async function getMockExamReview(
    mockExamId: string,
  ) {
  
    const response =
      await api.get(
        `/mock-exams/${mockExamId}/review`,
      );
  
    return response.data;
  }