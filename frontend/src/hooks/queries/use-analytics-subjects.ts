import {
    useQuery,
  } from "@tanstack/react-query";
  
  import api from "@/services/api/api";
  
  export function useAnalyticsSubjects() {
  
    return useQuery({
      queryKey: ["analytics-subjects"],
  
      queryFn: async () => {
  
        const response =
          await api.get(
            "/analytics/subjects",
          );
  
        return response.data;
      },
    });
  }
  