import {
    useQuery,
  } from "@tanstack/react-query";
  
  import api from "@/services/api/api";
  
  export function useAnalyticsProgress() {
  
    return useQuery({
      queryKey: ["analytics-progress"],
  
      queryFn: async () => {
  
        const response =
          await api.get(
            "/analytics/progress",
          );
  
        return response.data;
      },
    });
  }