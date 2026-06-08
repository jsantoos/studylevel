"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { login } from "@/lib/auth/auth-service";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {

    try {

      setLoading(true);

      setError("");

      await login({
        username,
        password,
      });

      router.push("/dashboard");

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

    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f8fafc]

        dark:bg-[#020617]
      "
    >

      <div
        className="
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          grid
          min-h-screen

          lg:grid-cols-2
        "
      >

        <div
          className="
            hidden
            flex-col
            justify-between
            p-16

            lg:flex
          "
        >

          <div>

            <Link
              href="/"

              className="
                inline-flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-indigo-500
                  via-violet-500
                  to-fuchsia-500
                  text-2xl
                  font-black
                  text-white
                  shadow-2xl
                "
              >

                AI

              </div>

              <div>

                <div
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-gray-900

                    dark:text-white
                  "
                >

                  StudyLevel

                </div>

                <div
                  className="
                    text-sm
                    text-gray-500

                    dark:text-gray-400
                  "
                >

                  Plataforma Inteligente

                </div>

              </div>

            </Link>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
              }}
            >

              <div
                className="
                  mt-24
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-indigo-600

                  dark:text-indigo-300
                "
              >

                <Sparkles className="h-4 w-4" />

                Plataforma de estudos com IA

              </div>

              <h1
                className="
                  mt-10
                  max-w-2xl
                  text-7xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-gray-900

                  dark:text-white
                "
              >

                Aprenda com IA.
                <br />

                Evolua diariamente.

              </h1>

              <p
                className="
                  mt-10
                  max-w-2xl
                  text-2xl
                  leading-10
                  text-gray-600

                  dark:text-gray-400
                "
              >

                Simulados inteligentes,
                analytics avançado
                e revisão automática
                para acelerar seus estudos.

              </p>

            </motion.div>

          </div>

          <div
            className="
              grid
              gap-5

              md:grid-cols-2
            "
          >

            {[
              {
                icon: BrainCircuit,
                title: "IA Adaptativa",
                description:
                  "A plataforma entende suas dificuldades.",
              },

              {
                icon: Trophy,
                title: "Gamificação",
                description:
                  "Ganhe XP e acompanhe sua evolução.",
              },

              {
                icon: ShieldCheck,
                title: "Aprendizado Seguro",
                description:
                  "Seu progresso salvo automaticamente.",
              },

              {
                icon: CheckCircle2,
                title: "Revisão Inteligente",
                description:
                  "Explicações automáticas com IA.",
              },
            ].map((item) => {

              const Icon =
                item.icon;

              return (

                <div
                  key={item.title}

                  className="
                    rounded-[32px]
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-xl

                    dark:border-white/10
                    dark:bg-slate-900/60
                  "
                >

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-fuchsia-500
                      text-white
                      shadow-xl
                    "
                  >

                    <Icon className="h-6 w-6" />

                  </div>

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      mt-3
                      leading-7
                      text-gray-600

                      dark:text-gray-400
                    "
                  >

                    {item.description}

                  </p>

                </div>

              );
            })}

          </div>

        </div>

        <div
          className="
            flex
            items-center
            justify-center
            p-8

            lg:p-16
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              duration: 0.4,
            }}

            className="
              w-full
              max-w-2xl
            "
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-gray-200
                bg-white
                p-10
                shadow-2xl

                dark:border-white/10
                dark:bg-gradient-to-br
                dark:from-slate-950
                dark:via-slate-900
                dark:to-[#111827]
              "
            >

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-64
                  w-64
                  rounded-full
                  bg-fuchsia-500/10
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-indigo-600

                    dark:text-indigo-300
                  "
                >

                  <Sparkles className="h-4 w-4" />

                  Login Inteligente

                </div>

                <h2
                  className="
                    mt-8
                    text-6xl
                    font-black
                    leading-tight
                    tracking-tight
                    text-gray-900

                    dark:text-white
                  "
                >

                  Bem-vindo
                  de volta

                </h2>

                <p
                  className="
                    mt-6
                    text-xl
                    leading-9
                    text-gray-600

                    dark:text-gray-400
                  "
                >

                  Continue sua jornada
                  de aprendizado com
                  inteligência artificial.

                </p>

                <div className="mt-12 space-y-7">

                  <div>

                    <label
                      className="
                        mb-3
                        block
                        text-sm
                        font-black
                        uppercase
                        tracking-wider
                        text-gray-700

                        dark:text-gray-300
                      "
                    >

                      Email

                    </label>

                    <div
                      className="
                        flex
                        h-16
                        items-center
                        gap-4
                        rounded-3xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-5
                        transition-all
                        duration-300
                        focus-within:border-indigo-500
                        focus-within:ring-4
                        focus-within:ring-indigo-500/10

                        dark:border-white/10
                        dark:bg-slate-950/60
                      "
                    >

                      <Mail
                        className="
                          h-5
                          w-5
                          text-gray-400
                        "
                      />

                      <input
                        type="email"
                        value={username}
                        onChange={(event) =>
                          setUsername(
                            event.target.value,
                          )
                        }

                        placeholder="Digite seu email"

                        className="
                          w-full
                          bg-transparent
                          text-lg
                          text-gray-900
                          outline-none
                          placeholder:text-gray-400

                          dark:text-white
                        "
                      />

                    </div>

                  </div>

                  <div>

                    <label
                      className="
                        mb-3
                        block
                        text-sm
                        font-black
                        uppercase
                        tracking-wider
                        text-gray-700

                        dark:text-gray-300
                      "
                    >

                      Senha

                    </label>

                    <div
                      className="
                        flex
                        h-16
                        items-center
                        gap-4
                        rounded-3xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-5
                        transition-all
                        duration-300
                        focus-within:border-indigo-500
                        focus-within:ring-4
                        focus-within:ring-indigo-500/10

                        dark:border-white/10
                        dark:bg-slate-950/60
                      "
                    >

                      <Lock
                        className="
                          h-5
                          w-5
                          text-gray-400
                        "
                      />

                      <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                          setPassword(
                            event.target.value,
                          )
                        }

                        placeholder="Digite sua senha"

                        className="
                          w-full
                          bg-transparent
                          text-lg
                          text-gray-900
                          outline-none
                          placeholder:text-gray-400

                          dark:text-white
                        "
                      />

                    </div>

                  </div>

                </div>

                {error && (

                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border
                      border-red-500/20
                      bg-red-500/10
                      px-5
                      py-4
                      text-sm
                      font-semibold
                      text-red-500
                    "
                  >

                    {error}

                  </div>

                )}

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="
                    group
                    mt-10
                    flex
                    h-16
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-3xl
                    bg-gradient-to-r
                    from-indigo-500
                    via-violet-500
                    to-fuchsia-500
                    text-lg
                    font-black
                    text-white
                    shadow-2xl
                    transition-all
                    duration-300
                    hover:scale-[1.01]
                    disabled:opacity-50
                  "
                >

                  {loading
                    ? "Entrando..."
                    : "Entrar na Plataforma"}

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />

                </button>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-between
                    text-sm
                  "
                >

                  <Link
                    href="#"

                    className="
                      font-semibold
                      text-indigo-600

                      dark:text-indigo-300
                    "
                  >

                    Esqueceu a senha?

                  </Link>

                  <Link
                    href="/"

                    className="
                      font-semibold
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Voltar ao início

                  </Link>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>

  );
}