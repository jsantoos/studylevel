import {
    useQuery,
  } from "@tanstack/react-query";
  
  import {
    getMockExamQuestions,
  } from "@/services/mock-exams/mock-exam.service";
  
  export function useMockExamQuestions(
    mockExamId: string,
  ) {
    return useQuery({
      queryKey: [
        "mock-exam",
        mockExamId,
      ],
  
      queryFn: () =>
        getMockExamQuestions(
          mockExamId,
        ),
  
      enabled: !!mockExamId,
    });
  }