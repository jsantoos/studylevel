import api from "@/services/api/api";

import type {
  UserPreferences,
} from "@/types/user";


export async function getPreferences() {

  const response =
    await api.get(
      "/users/me/preferences",
    );

  return response.data;
}

export async function updatePreferences(
  payload: UserPreferences,
) {

  const response =
    await api.patch(
      "/users/me/preferences",
      payload,
    );

  return response.data;
}
