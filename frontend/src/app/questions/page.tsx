"use client";

import {
  useState,
  useEffect,
  useRef
} from "react";

import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";

import { Topbar } from "@/components/layout/topbar";

import api from "@/services/api/api";

import { useRandomQuestion } from "@/hooks/queries/use-random-question";


export default function QuestionsPage() {


  const [selectedOption, setSelectedOption] =
    useState<string | null>(
      null,
    );

  const [answered, setAnswered] =
    useState(false);

  const [correct, setCorrect] =
    useState(false);

  const {
      data: question,
      isLoading: loading,
      refetch,
  } = useRandomQuestion();

  const startedAtRef =
   useRef<number>(0);

  const questionId = question?.id;
  useEffect(() => {
    if (questionId) {
      startedAtRef.current = Date.now();
    }
  }, [questionId]);;

  async function loadQuestion() {

    await refetch();

    setSelectedOption(null);
  
    setAnswered(false);
  
    setCorrect(false);
  }

 
  async function handleAnswer() {

    if (!selectedOption) {

      return;
    }

    const responseTime =
      Math.floor(
        (
          Date.now()
          - startedAtRef.current
        ) / 1000,
      );

    const response =
      await api.post(
        "/questions/answer",
        {
          question_id:
            question.id,

          option_id:
            selectedOption,

          response_time:
            responseTime,
        },
      );

    setCorrect(
      response.data.correct,
    );

    setAnswered(true);

    if (response.data.correct) {

      toast.success(
        "✨ Resposta correta! +10 XP",
      );

    } else {

      toast.error(
        "📘 Você aprendeu algo novo! +2 XP",
      );
    }
  }

  if (loading || !question) {

    return null;
  }

  return (

    <AppShell>

      <Topbar
        title="Modo Treino"
        description="Treine questões individuais com feedback imediato."
      />

      <div className="mx-auto max-w-5xl">

        <div
          className="
            min-w-0
            rounded-[32px]
            border
            border-gray-200
            bg-white
            p-10
            shadow-2xl
            backdrop-blur-xl
            transition-all
            duration-500

            dark:border-white/10
            dark:bg-slate-900/80
          "
        >

          <div className="mb-6 flex items-center justify-between">

            <div
              className="
                text-sm
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              Sessão de treino
            </div>

            <div
              className="
                rounded-2xl
                bg-indigo-100
                px-4
                py-2
                text-sm
                font-bold
                text-indigo-700

                dark:bg-indigo-500/10
                dark:text-indigo-300
              "
            >
              Questão prática
            </div>

          </div>

          <div className="mb-8 flex items-center gap-3">

            <div
              className="
                rounded-2xl
                bg-black
                px-4
                py-2
                text-sm
                font-bold
                text-white

                dark:bg-white
                dark:text-black
              "
            >

              {question.subject}

            </div>

            <div
              className="
                rounded-2xl
                bg-gray-100
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700

                dark:bg-slate-800
                dark:text-gray-300
              "
            >

              {question.topic}

            </div>

          </div>

          <div
            className="
              mt-8
              min-w-0
              w-full
            "
          >
          <h2
            className="
              w-full
              text-3xl
              font-black
              leading-[1.4]
              tracking-tight

              text-gray-900
              dark:text-white

              whitespace-normal
              break-words
            "
          >

            {question.statement}

          </h2>

          </div>

          <div className="mt-10 space-y-4">

            {question.options.map(
              (option: { id: string; text: string }) => {

                const active =
                  selectedOption
                  === option.id;

                return (

                  <button
                    key={option.id}

                    onClick={() =>
                      setSelectedOption(
                        option.id,
                      )
                    }

                    className={`w-full rounded-3xl border p-6 text-left text-lg font-medium transition-all duration-300 ${
                      active
                        ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-xl"

                        : `
                          border-gray-200
                          bg-white
                          text-gray-900
                          hover:scale-[1.01]
                          hover:border-indigo-300
                          hover:shadow-lg

                          dark:border-white/10
                          dark:bg-slate-800
                          dark:text-white
                          dark:hover:border-indigo-500
                          dark:hover:bg-slate-700
                        `
                    }`}
                  >

                    {option.text}

                  </button>
                );
              },
            )}

          </div>

          {!answered ? (

            <button
              onClick={handleAnswer}

              disabled={!selectedOption}

              className="
                mt-10
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-fuchsia-600
                px-6
                py-5
                text-lg
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-[1.01]
                hover:shadow-fuchsia-500/20
                disabled:opacity-40
              "
            >

              Responder

            </button>

          ) : (

            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

              <div
                className={`rounded-3xl p-8 ${
                  correct
                    ? `
                      border border-green-200
                      bg-gradient-to-br
                      from-green-50
                      to-emerald-50

                      dark:border-green-500/20
                      dark:from-green-950/40
                      dark:to-emerald-950/20
                    `

                    : `
                      border border-red-200
                      bg-gradient-to-br
                      from-red-50
                      to-rose-50

                      dark:border-red-500/20
                      dark:from-red-950/40
                      dark:to-rose-950/20
                    `
                }`}
              >

                <div
                  className="
                    text-3xl
                    font-black
                    tracking-tight

                    dark:text-white
                  "
                >

                  {correct
                    ? "✅ Resposta Correta"

                    : "❌ Resposta Incorreta"}

                </div>

                <p
                  className="
                    mt-4
                    text-lg
                    leading-8
                    text-gray-700

                    dark:text-gray-300
                  "
                >

                  {question.explanation}

                </p>

              </div>

              <button
                onClick={loadQuestion}

                className="
                  mt-8
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-fuchsia-600
                  px-6
                  py-5
                  text-lg
                  font-bold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  hover:shadow-fuchsia-500/20
                "
              >

                Próxima Questão

              </button>

            </div>

          )}

        </div>

      </div>

    </AppShell>
  );
}