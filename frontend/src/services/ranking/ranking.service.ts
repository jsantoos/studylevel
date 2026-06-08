import api from "@/services/api/api";

import {
  RankingUser,
} from "@/types/ranking";

export async function getRanking():
  Promise<RankingUser[]> {

  const response =
    await api.get<RankingUser[]>(
      "/ranking",
    );

  return response.data;
}