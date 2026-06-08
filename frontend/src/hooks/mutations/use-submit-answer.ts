import {
    useMutation,
  } from "@tanstack/react-query";
  
  import {
    submitAnswer,
  } from "@/services/mock-exams/mock-exam.service";
  
  import {
    SubmitAnswerInput,
  } from "@/types/mock-exam";
  

  export function useSubmitAnswer() {
  
    return useMutation({
      mutationFn: ({
        mockExamId,
        payload,
      }: SubmitAnswerInput) =>
        submitAnswer(
          mockExamId,
          payload,
        ),
    });
  }