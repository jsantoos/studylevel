import {
    useQuery,
  } from "@tanstack/react-query";
  
  import {
    getUserProgress,
  } from "@/services/user/progress.service";
  
  export function useUserProgress() {
  
    return useQuery({
      queryKey: [
        "user-progress",
      ],
  
      queryFn:
        getUserProgress,
    });
  }