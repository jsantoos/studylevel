import {
    useQuery,
  } from "@tanstack/react-query";
  
  import api from "@/services/api/api";
  
  export function useAnalyticsOverview() {
  
    return useQuery({
      queryKey: ["analytics-overview"],
  
      queryFn: async () => {
  
        const response =
          await api.get(
            "/analytics/overview",
          );
  
        return response.data;
      },
    });
}
