"use client";

import {
  use,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Brain,
  CheckCircle2,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";

import api from "@/services/api/api";

import { AppShell } from "@/components/layout/app-shell";

import { Topbar } from "@/components/layout/topbar";

import type {
  ReviewItem,
} from "@/types/mock-exam";

export default function ReviewPage({

  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const resolvedParams =
    use(params);

  const [loading, setLoading] =
    useState(true);

  const [items, setItems] =
    useState<ReviewItem[]>(
      [],
    );

  useEffect(() => {

    async function loadReview() {

      try {

        const response =
          await api.get(
            `/mock-exams/${resolvedParams.id}/review`,
          );

        setItems(
          response.data,
        );

      } finally {

        setLoading(false);
      }
    }

    loadReview();

  }, [resolvedParams.id]);

  const stats =
    useMemo(() => {

      const total =
        items.length;

      const correct =
        items.filter(
          (item) =>
            item.is_correct,
        ).length;

      const incorrect =
        total - correct;

      const accuracy =
        total > 0
          ? Math.round(
              (correct / total) *
                100,
            )
          : 0;

      return {
        total,
        correct,
        incorrect,
        accuracy,
      };

    }, [items]);

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white

          dark:bg-[#020617]
        "
      >

        <div className="text-center">

          <div
            className="
              mx-auto
              mb-6
              h-16
              w-16
              animate-spin
              rounded-full
              border-4
              border-indigo-500/20
              border-t-indigo-500
            "
          />

          <div
            className="
              text-xl
              font-bold
              text-gray-900

              dark:text-white
            "
          >

            Carregando revisão...

          </div>

        </div>

      </div>
    );
  }

  return (

    <AppShell>

      <Topbar
        title="Revisão Inteligente"
        description="Analise seus erros, fortaleça seus pontos fracos e evolua continuamente."
      />

      <div className="mx-auto max-w-7xl">

        <div
          className="
            mb-12
            overflow-hidden
            rounded-[36px]
            border
            border-gray-200
            bg-white
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
              relative
              overflow-hidden
              px-10
              py-12
            "
          >

            <div
              className="
                absolute
                right-0
                top-0
                h-72
                w-72
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
                h-72
                w-72
                rounded-full
                bg-indigo-500/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                grid
                gap-10
                lg:grid-cols-[1.2fr_0.8fr]
                lg:items-center
              "
            >

              <div>

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

                  Revisão Personalizada

                </div>

                <h1
                  className="
                    mt-6
                    text-5xl
                    font-black
                    leading-tight
                    tracking-tight
                    text-gray-900

                    dark:text-white
                  "
                >

                  Aprenda com seus
                  resultados

                </h1>

                <p
                  className="
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-9
                    text-gray-600

                    dark:text-gray-400
                  "
                >

                  Revise explicações detalhadas,
                  identifique padrões de erro
                  e acelere sua evolução com
                  insights inteligentes.

                </p>

              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                "
              >

                <div
                  className="
                    rounded-3xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-6

                    dark:border-emerald-500/10
                    dark:bg-emerald-500/10
                  "
                >

                  <div className="flex items-center justify-between">

                    <CheckCircle2
                      className="
                        h-8
                        w-8
                        text-emerald-600

                        dark:text-emerald-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-emerald-700

                        dark:text-emerald-300
                      "
                    >

                      Acertos

                    </span>

                  </div>

                  <div
                    className="
                      mt-5
                      text-4xl
                      font-black
                      text-emerald-700

                      dark:text-emerald-300
                    "
                  >

                    {stats.correct}

                  </div>

                </div>

                <div
                  className="
                    rounded-3xl
                    border
                    border-red-200
                    bg-red-50
                    p-6

                    dark:border-red-500/10
                    dark:bg-red-500/10
                  "
                >

                  <div className="flex items-center justify-between">

                    <XCircle
                      className="
                        h-8
                        w-8
                        text-red-600

                        dark:text-red-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-red-700

                        dark:text-red-300
                      "
                    >

                      Erros

                    </span>

                  </div>

                  <div
                    className="
                      mt-5
                      text-4xl
                      font-black
                      text-red-700

                      dark:text-red-300
                    "
                  >

                    {stats.incorrect}

                  </div>

                </div>

                <div
                  className="
                    rounded-3xl
                    border
                    border-indigo-200
                    bg-indigo-50
                    p-6

                    dark:border-indigo-500/10
                    dark:bg-indigo-500/10
                  "
                >

                  <div className="flex items-center justify-between">

                    <Target
                      className="
                        h-8
                        w-8
                        text-indigo-600

                        dark:text-indigo-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-indigo-700

                        dark:text-indigo-300
                      "
                    >

                      Precisão

                    </span>

                  </div>

                  <div
                    className="
                      mt-5
                      text-4xl
                      font-black
                      text-indigo-700

                      dark:text-indigo-300
                    "
                  >

                    {stats.accuracy}%

                  </div>

                </div>

                <div
                  className="
                    rounded-3xl
                    border
                    border-fuchsia-200
                    bg-fuchsia-50
                    p-6

                    dark:border-fuchsia-500/10
                    dark:bg-fuchsia-500/10
                  "
                >

                  <div className="flex items-center justify-between">

                    <Brain
                      className="
                        h-8
                        w-8
                        text-fuchsia-600

                        dark:text-fuchsia-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-fuchsia-700

                        dark:text-fuchsia-300
                      "
                    >

                      Questões

                    </span>

                  </div>

                  <div
                    className="
                      mt-5
                      text-4xl
                      font-black
                      text-fuchsia-700

                      dark:text-fuchsia-300
                    "
                  >

                    {stats.total}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="space-y-8">

          {items.map(
            (item, index) => (

              <div
                key={
                  item.question_id
                }

                className={`
                  overflow-hidden
                  rounded-[32px]
                  border
                  shadow-2xl
                  backdrop-blur-xl

                  ${
                    item.is_correct

                      ? `
                        border-emerald-200
                        bg-gradient-to-br
                        from-emerald-50
                        to-white

                        dark:border-emerald-500/10
                        dark:from-emerald-500/10
                        dark:to-slate-950
                      `

                      : `
                        border-red-200
                        bg-gradient-to-br
                        from-red-50
                        to-white

                        dark:border-red-500/10
                        dark:from-red-500/10
                        dark:to-slate-950
                      `
                  }
                `}
              >

                <div className="p-8 lg:p-10">

                  <div
                    className="
                      flex
                      flex-col
                      gap-5

                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          text-sm
                          font-semibold
                          uppercase
                          tracking-widest
                          text-gray-500

                          dark:text-gray-400
                        "
                      >

                        Questão {index + 1}

                      </div>

                      <h2
                        className="
                          mt-5
                          text-3xl
                          font-black
                          leading-tight
                          text-gray-900

                          dark:text-white
                        "
                      >

                        {item.statement}

                      </h2>

                    </div>

                    <div
                      className={`
                        inline-flex
                        items-center
                        gap-3
                        rounded-2xl
                        px-5
                        py-4
                        text-sm
                        font-black
                        shadow-lg

                        ${
                          item.is_correct

                            ? `
                              bg-emerald-500
                              text-white
                            `

                            : `
                              bg-red-500
                              text-white
                            `
                        }
                      `}
                    >

                      {item.is_correct
                        ? "✅ Acertou"
                        : "❌ Errou"}

                    </div>

                  </div>

                  <div
                    className="
                      mt-10
                      grid
                      gap-6

                      lg:grid-cols-2
                    "
                  >

                    <div
                      className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/80
                        p-6
                        shadow-xl

                        dark:bg-slate-950/60
                      "
                    >

                      <div
                        className="
                          text-sm
                          font-semibold
                          text-gray-500

                          dark:text-gray-400
                        "
                      >

                        Sua resposta

                      </div>

                      <div
                        className="
                          mt-4
                          text-2xl
                          font-black
                          text-gray-900

                          dark:text-white
                        "
                      >

                        {item.selected_option ??
                          "Não respondida"}

                      </div>

                    </div>

                    <div
                      className="
                        rounded-3xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        p-6
                        shadow-xl

                        dark:border-emerald-500/10
                        dark:bg-emerald-500/10
                      "
                    >

                      <div
                        className="
                          text-sm
                          font-semibold
                          text-emerald-700

                          dark:text-emerald-300
                        "
                      >

                        Resposta correta

                      </div>

                      <div
                        className="
                          mt-4
                          text-2xl
                          font-black
                          text-emerald-700

                          dark:text-emerald-300
                        "
                      >

                        {item.correct_option}

                      </div>

                    </div>

                  </div>

                  <div
                    className="
                      mt-8
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/80
                      p-7
                      shadow-xl

                      dark:bg-slate-950/60
                    "
                  >

                    <div
                      className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-widest
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      Explicação detalhada

                    </div>

                    <p
                      className="
                        mt-5
                        text-lg
                        leading-9
                        text-gray-700

                        dark:text-gray-300
                      "
                    >

                      {item.explanation}

                    </p>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">

                    <div
                      className="
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-500
                        to-violet-500
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                      "
                    >

                      {item.subject}

                    </div>

                    <div
                      className="
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-gray-700

                        dark:border-white/10
                        dark:bg-slate-950/60
                        dark:text-gray-300
                      "
                    >

                      {item.topic}

                    </div>

                    <div
                      className="
                        rounded-full
                        border
                        border-yellow-300
                        bg-yellow-100
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-yellow-800

                        dark:border-yellow-500/20
                        dark:bg-yellow-500/10
                        dark:text-yellow-300
                      "
                    >

                      Dificuldade:
                      {" "}
                      {item.difficulty}

                    </div>

                  </div>

                </div>

              </div>

            ),
          )}

        </div>

      </div>

    </AppShell>
  );
}