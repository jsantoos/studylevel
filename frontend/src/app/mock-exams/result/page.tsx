"use client";

import { motion } from "framer-motion";

import CountUp from "react-countup";

import Confetti from "react-confetti";

import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Flame,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";

import { Topbar } from "@/components/layout/topbar";

import { useRouter }
  from "next/navigation";

import {
  useRouteLoader,
} from "@/providers/route-loader-provider";


import type {
  MockExamResult,
} from "@/types/mock-exam";

export default function MockExamResultPage() {
  
  const router =
    useRouter();

  const {
    showLoader,
  } = useRouteLoader();

  
  const windowSize =
    typeof window !== "undefined"
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : {
          width: 0,
          height: 0,
  };

  const result: MockExamResult | null =
    typeof window !== "undefined"
      ? (() => {

          const stored =
            localStorage.getItem(
              "mock-exam-result",
            );

          return stored
            ? (
                JSON.parse(
                  stored,
                ) as MockExamResult
              )
            : null;

        })()
      : null;

 
  if (!result) {
    return null;
  }

  const performanceLabel =
    result.score >= 80
      ? "Excelente desempenho"

      : result.score >= 60
      ? "Bom desempenho"

      : "Continue praticando";

  const performanceDescription =
    result.score >= 80
      ? "Você demonstrou domínio avançado do conteúdo."

      : result.score >= 60
      ? "Seu desempenho foi consistente e promissor."

      : "Continue treinando para fortalecer seus conhecimentos.";

  const progressGradient =
    result.score >= 80
      ? "from-emerald-500 via-green-400 to-lime-400"

      : result.score >= 60
      ? "from-yellow-500 via-orange-400 to-amber-400"

      : "from-rose-500 via-red-500 to-pink-500";

  const xpEarned =
    Math.round(
      result.score * 1.5,
    );

  const minutes =
    Math.floor(
      result.totalTime / 60,
    );

  const seconds =
    result.totalTime % 60;

  return (

    <AppShell>

      <Topbar
        title="Resultado do Simulado"
        description="Analise seu desempenho e acompanhe sua evolução."
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-gray-200
          bg-gradient-to-br
          from-white
          via-slate-50
          to-indigo-50
          p-8
          shadow-2xl

          dark:border-white/10
          dark:from-slate-950
          dark:via-slate-900
          dark:to-black
        "
      >

        {result.score >= 70 && (

          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={220}
          />

        )}

        <div
          className="
            absolute
            right-0
            top-0
            h-96
            w-96
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-96
            w-96
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

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

          className="relative z-10"
        >

          <div className="grid gap-10 xl:grid-cols-[1.4fr_420px]">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
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

                Resultado Inteligente

              </div>

              <div className="mt-8">

                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}

                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}

                  transition={{
                    delay: 0.2,
                  }}

                  className="text-7xl"
                >
                  🎯
                </motion.div>

                <h1
                  className="
                    mt-6
                    text-5xl
                    font-black
                    tracking-tight
                    text-gray-900

                    dark:text-white
                  "
                >

                  Simulado Finalizado

                </h1>

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-lg
                    leading-8
                    text-gray-600

                    dark:text-gray-400
                  "
                >

                  {performanceDescription}

                </p>

              </div>

              <div className="mt-12">

                <div
                  className={`
                    text-8xl
                    font-black
                    tracking-tight
                    bg-gradient-to-r
                    ${progressGradient}
                    bg-clip-text
                    text-transparent
                  `}
                >

                  <CountUp
                    end={result.score}
                    duration={1.5}
                  />

                  %

                </div>

                <div
                  className="
                    mt-3
                    text-3xl
                    font-black
                    text-gray-900

                    dark:text-white
                  "
                >

                  {performanceLabel}

                </div>

              </div>

              <div className="mt-10">

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    text-sm
                    font-semibold
                    text-gray-500

                    dark:text-gray-400
                  "
                >

                  <span>
                    Seu progresso
                  </span>

                  <span>
                    {result.score}%
                  </span>

                </div>

                <div
                  className="
                    h-5
                    overflow-hidden
                    rounded-full
                    bg-gray-200

                    dark:bg-white/10
                  "
                >

                  <motion.div
                    initial={{
                      width: 0,
                    }}

                    animate={{
                      width: `${result.score}%`,
                    }}

                    transition={{
                      duration: 1.2,
                    }}

                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${progressGradient}
                    `}
                  />

                </div>

              </div>

            </div>

            <div
              className="
                rounded-[32px]
                border
                border-gray-200
                bg-white/80
                p-8
                shadow-2xl
                backdrop-blur-2xl

                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >

              <div className="flex items-center gap-4">

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
                    to-fuchsia-500
                    text-white
                    shadow-2xl
                  "
                >

                  <Trophy className="h-8 w-8" />

                </div>

                <div>

                  <div
                    className="
                      text-sm
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    XP ganho

                  </div>

                  <div
                    className="
                      text-5xl
                      font-black
                      tracking-tight
                      text-gray-900

                      dark:text-white
                    "
                  >

                    +{xpEarned}

                  </div>

                </div>

              </div>

              <div className="mt-10 space-y-5">

                {[
                  {
                    icon: Target,
                    label: "Acertos",
                    value:
                      result.correct_answers,
                    color:
                      "text-emerald-500",
                  },

                  {
                    icon: BrainCircuit,
                    label: "Respondidas",
                    value:
                      result.total_answers,
                    color:
                      "text-indigo-500",
                  },

                  {
                    icon: Trophy,
                    label: "Aproveitamento",
                    value: `${result.score}%`,
                    color:
                      "text-yellow-500",
                  },

                  {
                    icon: Clock3,
                    label: "Tempo",
                    value: `${minutes}m ${seconds}s`,
                    color:
                      "text-fuchsia-500",
                  },
                ].map((item) => {

                  const Icon =
                    item.icon;

                  return (

                    <div
                      key={item.label}

                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-5
                        py-5

                        dark:border-white/10
                        dark:bg-slate-950/60
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white
                            shadow-sm

                            dark:bg-white/5
                          "
                        >

                          <Icon
                            className={`h-5 w-5 ${item.color}`}
                          />

                        </div>

                        <div>

                          <div
                            className="
                              text-sm
                              text-gray-500

                              dark:text-gray-400
                            "
                          >

                            {item.label}

                          </div>

                          <div
                            className="
                              text-xl
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >

                            {item.value}

                          </div>

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>

              <div
                className="
                  mt-8
                  rounded-3xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  p-6
                "
              >

                <div className="flex items-center gap-3">

                  <Flame className="h-6 w-6 text-emerald-400" />

                  <div>

                    <div
                      className="
                        text-lg
                        font-black
                        text-emerald-300
                      "
                    >

                      Continue Evoluindo

                    </div>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-emerald-700
                        dark:text-emerald-200
                      "
                    >

                      Complete mais simulados para subir de nível rapidamente.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">

            <button
              onClick={() => {

                showLoader();
              
                router.push(
                  "/mock-exams",
                );
              }}

              className="
                group
                flex
                items-center
                justify-center
                gap-3
                rounded-3xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-fuchsia-600
                px-8
                py-5
                text-lg
                font-black
                text-white
                shadow-2xl
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >

              Continuar Evoluindo

              <ArrowRight
                className="
                  h-5
                  w-5
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </button>

            <button
              onClick={() => {

                showLoader();
              
                router.push(
                  `/mock-exams/${result.mockExamId}/review`,
                );
              }}

              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                px-8
                py-5
                text-lg
                font-black
                text-gray-900
                shadow-lg
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-gray-50

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-white/[0.05]
              "
            >

              Revisar Simulado

            </button>

          </div>

        </motion.div>

      </div>

    </AppShell>
  );
}