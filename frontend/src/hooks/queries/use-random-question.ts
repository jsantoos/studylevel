import {
    useQuery,
  } from "@tanstack/react-query";
  
  import api from "@/services/api/api";
  
  export function useRandomQuestion() {
  
    return useQuery({
      queryKey: [
        "random-question",
      ],
  
      queryFn: async () => {
  
        const response =
          await api.get(
            "/questions/random",
          );
  
        return response.data;
      },
    });
  }