"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDailyMissions,
} from "@/services/user/daily-mission.service";

export function useDailyMissions() {
  return useQuery({
    queryKey: [
      "daily-missions",
    ],

    queryFn:
      getDailyMissions,
  });
}