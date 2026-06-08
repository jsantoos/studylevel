import Cookies from "js-cookie";

const TOKEN_KEY =
  "study_ai_token";

export function saveToken(
  token: string,
) {

  Cookies.set(
    TOKEN_KEY,
    token,
    {
      expires: 7,
    },
  );
}

export function getToken() {

  return Cookies.get(
    TOKEN_KEY,
  );
}

export function removeToken() {

  Cookies.remove(
    TOKEN_KEY,
  );
}

export function isAuthenticated() {

  return !!getToken();
}