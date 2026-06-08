import api from "@/services/api/api";

import {
  UserProgress,
} from "@/types/user";

export async function getUserProgress():
  Promise<UserProgress> {

  const response =
    await api.get<UserProgress>(
      "/users/me/progress",
    );

  return response.data;
}