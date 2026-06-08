import {
    useMutation,
  } from "@tanstack/react-query";
  
  import {
    generateExplanation,
  } from "@/services/ai/explanation.service";
  
  export function useGenerateExplanation() {
  
    return useMutation({
  
      mutationFn:
        generateExplanation,
  
      retry: (
        failureCount,
        error: { response?: { status?: number } },
      ) => {
  
        const status =
          error?.response?.status;
  
        if (
          status === 400 ||
          status === 401 ||
          status === 403 ||
          status === 404
        ) {
          return false;
        }
  
        return failureCount < 3;
  
      },
  
      retryDelay: (
        attempt,
      ) =>
        attempt * 1000,
  
    });
  
  }