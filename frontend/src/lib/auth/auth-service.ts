import api from "@/services/api/api";

import {
  saveToken,
} from "./auth-storage";

interface LoginPayload {

  username: string;

  password: string;
}

interface LoginResponse {

  access_token: string;

  token_type: string;
}

export async function login(
  payload: LoginPayload,
) {

  const formData =
    new URLSearchParams();

  formData.append(
    "username",
    payload.username,
  );

  formData.append(
    "password",
    payload.password,
  );

  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      },
    );

  saveToken(
    response.data.access_token,
  );

  return response.data;
}