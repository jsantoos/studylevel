import api from "@/services/api/api";

import { OverviewAnalytics } from "@/types/analytics";

export async function getOverviewAnalytics() {
  const response =
    await api.get<OverviewAnalytics>(
      "/analytics",
    );

  return response.data;
}