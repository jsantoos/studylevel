import {
    useQuery,
  } from "@tanstack/react-query";
  
  import api from "@/services/api/api";
  
  export function useSidebarStats() {
  
    return useQuery({
      queryKey: [
        "sidebar-stats",
      ],
  
      queryFn: async () => {
  
        const response =
          await api.get(
            "/users/me/sidebar",
          );
  
        return response.data;
      },
    });
  }