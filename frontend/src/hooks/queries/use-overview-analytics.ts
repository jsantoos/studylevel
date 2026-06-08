"use client";

import { useQuery } from "@tanstack/react-query";

import { getOverviewAnalytics } from "@/services/analytics/analytics.service";

export function useOverviewAnalytics() {
  return useQuery({
    queryKey: [
      "overview-analytics",
    ],

    queryFn:
      getOverviewAnalytics,
  });
}