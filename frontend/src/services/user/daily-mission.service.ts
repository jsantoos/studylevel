import api from "@/services/api/api";

import type {
  DailyMission,
} from "@/types/user";

export async function getDailyMissions() {
  const response = await api.get<
    DailyMission[]
  >("/daily-missions");

  return response.data;
}
