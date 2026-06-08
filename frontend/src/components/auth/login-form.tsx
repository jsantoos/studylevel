"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { login } from "@/lib/auth/auth-service";

import { useAuthStore } from "@/stores/auth-store";

import { saveToken, } from "@/lib/auth/auth-storage";

export function LoginForm() {

  const router = useRouter();

  const setAccessToken =
    useAuthStore(
      (state) => state.setAccessToken,
    );

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
  
    e.preventDefault();
  
    try {
  
      setLoading(true);
  
      setError("");
  
      const response =
        await login({
          username,
          password,
        });
  
      saveToken(
        response.access_token,
      );
  
      setAccessToken(
        response.access_token,
      );
  
      router.push(
        "/dashboard",
      );
  
    } catch (error) {
  
      console.error(error);
  
      setError(
        "Usuário ou senha inválidos.",
      );
  
    } finally {
  
      setLoading(false);
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
    >

      <div>

        <label
          className="
            text-sm
            font-semibold
            text-gray-700

            dark:text-gray-300
          "
        >

          Usuário

        </label>

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value,
            )
          }

          placeholder="Digite seu usuário"

          autoComplete="username"

          className="
            mt-2
            h-14
            w-full
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-5
            text-gray-900
            outline-none
            transition-all

            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-500/20

            dark:border-white/10
            dark:bg-slate-950
            dark:text-white
            dark:placeholder:text-gray-500
            dark:focus:border-indigo-400
            dark:focus:ring-indigo-500/10
          "
        />

      </div>

      <div>

        <label
          className="
            text-sm
            font-semibold
            text-gray-700

            dark:text-gray-300
          "
        >

          Senha

        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value,
            )
          }

          placeholder="Digite sua senha"

          autoComplete="current-password"

          className="
            mt-2
            h-14
            w-full
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-5
            text-gray-900
            outline-none
            transition-all

            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-500/20

            dark:border-white/10
            dark:bg-slate-950
            dark:text-white
            dark:placeholder:text-gray-500
            dark:focus:border-indigo-400
            dark:focus:ring-indigo-500/10
          "
        />

      </div>

      {error && (

        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            font-medium
            text-red-500
          "
        >

          {error}

        </div>

      )}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-14
          w-full
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-fuchsia-500
          text-base
          font-bold
          text-white
          shadow-xl
          transition-all
          duration-300

          hover:scale-[1.01]
          hover:opacity-95

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >

        {loading
          ? "Entrando..."
          : "Entrar"}

      </button>

    </form>
  );
}