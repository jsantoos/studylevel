"use client";

import {
  use,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Clock3,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import {
  AIHintCard,
} from "@/components/mock-exam/ai-hint-card";


import {
  MockExamNavigation,
} from "@/components/mock-exam/mock-exam-navigation";

import {
  MockExamProgress,
} from "@/components/mock-exam/mock-exam-progress";

import {
  MockQuestionCard,
} from "@/components/mock-exam/mock-question-card";

import {
  MockQuestionOptions,
} from "@/components/mock-exam/mock-question-options";

import {
  MockQuestionNavigator,
} from "@/components/mock-exam/mock-question-navigator";

import {
  useMockExamQuestions,
} from "@/hooks/queries/use-mock-exam-questions";

import {
  useSubmitAnswer,
} from "@/hooks/mutations/use-submit-answer";


import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { AppShell } from "@/components/layout/app-shell";

import { useRouter }
  from "next/navigation";

import {
  useRouteLoader,
} from "@/providers/route-loader-provider";

import type {
  AnsweredQuestion,
} from "@/types/mock-exam";

import { finishMockExam } from "@/services/mock-exams/mock-exam.service";

import {
  AIExplanationCard,
} from "@/components/mock-exam/ai-explanation-card";

interface Props {
  params: Promise<{
    id: string;
  }>;
}


export default function MockExamPage({
  params,
}: Props) {


  const router =
    useRouter();

  const {
    showLoader,
  } = useRouteLoader();

  const { id } = use(params);

  const {
    data: questions = [],
    isLoading: loading,
  } = useMockExamQuestions(id);
  
  const submitAnswerMutation =
    useSubmitAnswer();

  const [currentIndex, setCurrentIndex] =
    useState(0);


  const [feedback, setFeedback] =
    useState<{
      type:
        | "success"
        | "error"
        | "warning";

      message: string;
    } | null>(null);

  
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnsweredQuestion[]>([]);

  const answered =
    answeredQuestions.some(
      (question) =>
        question.index ===
        currentIndex,
  );

  const [
    answersMap,
    setAnswersMap,
  ] = useState<
    Record<string, string>
  >({});

  const [
    resultsMap,
    setResultsMap,
  ] = useState<
    Record<
      string,
      {
        isCorrect: boolean;
      }
    >
  >({});

  const [seconds, setSeconds] =
    useState(0);

 

  const [submitting, setSubmitting] =
    useState(false);

  const queryClient =
    useQueryClient();

  const currentQuestion =
    questions[currentIndex];

  
  const [selectedOption, setSelectedOption] =
    useState<string | null>(
      currentQuestion
        ? answersMap[currentQuestion.id] ?? null
        : null
    );

  useEffect(() => {

    const interval =
      setInterval(() => {

        setSeconds(
          (prev) => prev + 1,
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  useEffect(() => {

    if (!currentQuestion) {
      return;
    }
    
    setTimeout(() => {

      setSelectedOption(
        answersMap[
          currentQuestion.id
        ] ?? null,
      );
    
    }, 0);

    const storedResult =
      resultsMap[
        currentQuestion.id
      ];

    if (storedResult) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeedback({
        type:
          storedResult.isCorrect
            ? "success"
            : "error",

        message:
          storedResult.isCorrect
            ? "✅ Resposta correta!"
            : "❌ Resposta incorreta!",
      });

    } else {

      setFeedback(null);
    }

  }, [
    currentIndex,
    currentQuestion,
    answeredQuestions,
    answersMap,
    resultsMap
  ]);


  async function handleSubmit() {

    if (
      !selectedOption ||
      !currentQuestion ||
      answered
    ) {
      return;
    }

    setSubmitting(true);

    try {

      const response =
        await submitAnswerMutation.mutateAsync({
          mockExamId: id,

          payload: {
            question_id:
              currentQuestion.id,

            selected_option_id:
              selectedOption,

            response_time:
              seconds,
          },
        });

      // setAnswered(true);

      setAnswersMap(
        (prev) => ({

          ...prev,

          [currentQuestion.id]:
            selectedOption,
        }),
      );

      setAnsweredQuestions(
        (prev) => [
      
          ...prev.filter(
            (q) => q.index !== currentIndex,
          ),
      
          {
            index: currentIndex,
      
            correct:
              response.is_correct,
          },
        ],
      );

      setResultsMap(
        (prev) => ({

          ...prev,

          [currentQuestion.id]: {
            isCorrect:
              response.is_correct,
          },
        }),
      );

      setFeedback({
        type: response.is_correct
          ? "success"
          : "error",

        message: response.is_correct
          ? "✅ Resposta correta!"
          : "❌ Resposta incorreta!",
      });

      queryClient.invalidateQueries({
        queryKey: [
          "daily-missions",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "overview-analytics",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "user-progress",
        ],
      });

      if (response.is_correct) {

        toast.success(
          "Você acertou e ganhou +10 XP",
        );

      } else {

        toast.error(
          "📘 Você aprendeu algo novo! +2 XP",
        );
      }

    } catch (error: unknown) {

      console.error(error);

      const detail =
        error instanceof Error
          ? error.message
          : "Erro ao responder questão.";

      setFeedback({
        type: "warning",

        message:
          detail ||
          "Erro ao responder questão.",
      });

    } finally {

      setSubmitting(false);
    }
  }

  function handleNext() {

    if (
      currentIndex + 1 >=
      questions.length
    ) {
      return;
    }
  
    setSelectedOption(
      null,
    );
  
    setCurrentIndex(
      (prev) => prev + 1,
    );
  }
  
  function handlePrevious() {
  
    if (currentIndex === 0) {
      return;
    }
  
    setSelectedOption(
      null,
    );
  
    setCurrentIndex(
      (prev) => prev - 1,
    );
  }

  async function handleFinishExam() {

    try {
  
      // setLoading(true);
  
      showLoader();
  
      const result =
        await finishMockExam(id);
  
      localStorage.setItem(
        "mock-exam-result",
  
        JSON.stringify({
          mockExamId: id,
  
          score: result.score,
  
          correct_answers:
            result.correct_answers,
  
          total_answers:
            result.total_answers,
  
          totalTime: seconds,
        }),
      );
  
      toast.success(
        "🎉 Simulado finalizado!",
      );
  
      router.push(
        "/mock-exams/result",
      );
  
    } catch (error) {
  
      console.error(error);
  
      // setLoading(false);
  
      setFeedback({
        type: "error",
  
        message:
          "Erro ao finalizar simulado.",
      });
    }
  }

  const timer =
    useMemo(() => {

      const mins =
        String(
          Math.floor(seconds / 60),
        ).padStart(2, "0");

      const secs =
        String(seconds % 60)
          .padStart(2, "0");

      return `${mins}:${secs}`;

    }, [seconds]);

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
              h-16
              w-16
              animate-spin
              rounded-full
              border-4
              border-indigo-500/20
              border-t-indigo-500
            "
          />

          <p
            className="
              mt-6
              text-lg
              font-semibold
              text-gray-700

              dark:text-gray-300
            "
          >

            Carregando simulado...

          </p>

        </div>

      </div>
    );
  }

  if (!currentQuestion) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
      >

        <div
          className="
            text-lg
            font-semibold
            text-gray-700

            dark:text-gray-300
          "
        >

          Nenhuma questão encontrada.

        </div>

      </div>
    );
  }

  return (

    <AppShell>

      <div className="relative">

        <div
          className="
            absolute
            left-0
            top-0
            h-[400px]
            w-[400px]
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
            h-[400px]
            w-[400px]
            rounded-full
            bg-fuchsia-500/10
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto max-w-7xl">

            <div
              className="
                grid
                grid-cols-1
                items-start
                gap-6

                xl:grid-cols-12
                xl:gap-8
              "
            >
            <div
              className="
                space-y-6

                xl:col-span-9
                xl:space-y-8
              "
            >
              <div
                className="
                  rounded-[32px]
                  border
                  border-gray-200
                  bg-white/90
                  p-5 xl:p-8
                  shadow-2xl
                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-slate-900/80
                "
              >

                  <div
                    className="
                      flex
                      flex-col
                      gap-6

                      xl:flex-row
                      xl:items-center
                      xl:justify-between
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
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-indigo-600

                        dark:text-indigo-300
                      "
                    >

                      <Sparkles className="h-4 w-4" />

                      Simulado em andamento

                    </div>

                    <h1
                      className="
                        mt-5
                        text-3xl xl:text-4xl
                        font-black
                        tracking-tight
                        text-gray-900

                        dark:text-white
                      "
                    >

                      Questão
                      {" "}
                      {currentIndex + 1}

                    </h1>

                    <p
                      className="
                        mt-3
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      Continue focado e avance
                      no seu progresso.

                    </p>

                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-4
                        shadow-sm

                        dark:border-white/10
                        dark:bg-slate-950
                      "
                    >

                      <Clock3
                        className="
                          h-5
                          w-5
                          text-indigo-500
                        "
                      />

                      <div>

                        <div
                          className="
                            text-xs
                            text-gray-500

                            dark:text-gray-400
                          "
                        >

                          Tempo

                        </div>

                        <div
                          className="
                            text-lg
                            font-bold
                            text-gray-900

                            dark:text-white
                          "
                        >

                          {timer}

                        </div>

                      </div>

                    </div>
                    <div
                      className="
                        flex
                        w-full
                        items-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-500
                        to-fuchsia-500
                        px-5
                        py-4
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                      "
                    >

                      <span className="opacity-80">
                        Dificuldade:
                      </span>

                      <span>
                        {currentQuestion.difficulty}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-8">

                  <MockExamProgress
                    current={
                      answeredQuestions.length
                    }
                    total={
                      questions.length
                    }
                  />

                </div>

              </div>

              <div
                className="
                  rounded-[32px]
                  border
                  border-gray-200
                  bg-white
                  p-5 xl:p-10
                  shadow-2xl

                  dark:border-white/10
                  dark:bg-slate-900
                "
              >

                <MockQuestionCard
                  statement={
                    currentQuestion.statement
                  }
                />

                <div className="mt-10">

                  <MockQuestionOptions
                    options={
                      currentQuestion.options
                    }

                    selectedOption={
                      selectedOption
                    }

                    onSelect={(optionId) => {

                      if (answered) {
                        return;
                      }

                      setSelectedOption(
                        optionId,
                      );

                      setAnswersMap(
                        (prev) => ({

                          ...prev,

                          [currentQuestion.id]:
                            optionId,
                        }),
                      );
                    }}
                  />

                </div>

                <div className="mt-10">

                <AIHintCard
                    question={
                      currentQuestion.statement
                    }
                    alternatives={
                      currentQuestion.options.map(
                        (option) =>
                          option.option_text,
                      )
                    }
                    difficulty={
                      String(
                        currentQuestion.difficulty,
                      )
                    }
                    subject={
                      currentQuestion.subject
                    }
                />

                {answered && (

                <div className="mt-6">

                  <AIExplanationCard
                    questionId={
                      currentQuestion.id
                    }
                    selectedOptionId={
                      answersMap[
                        currentQuestion.id
                      ]
                    }
                    officialExplanation={
                      currentQuestion.explanation
                    }
                  />

                </div>

                )}
              </div>

                {feedback && (

                  <div
                    className={`
                      mt-8
                      rounded-3xl
                      border
                      p-6
                      text-lg
                      font-semibold

                      ${
                        feedback.type === "success"

                          ? `
                            border-green-200
                            bg-green-50
                            text-green-700

                            dark:border-green-500/20
                            dark:bg-green-950/20
                            dark:text-green-300
                          `

                          : feedback.type === "error"

                          ? `
                            border-red-200
                            bg-red-50
                            text-red-700

                            dark:border-red-500/20
                            dark:bg-red-950/20
                            dark:text-red-300
                          `

                          : `
                            border-yellow-200
                            bg-yellow-50
                            text-yellow-700

                            dark:border-yellow-500/20
                            dark:bg-yellow-950/20
                            dark:text-yellow-300
                          `
                      }
                    `}
                  >

                    {feedback.message}

                  </div>

                )}

                  <div
                    className="
                      mt-10
                      flex
                      flex-col
                      gap-4

                      xl:flex-row
                      xl:items-center
                      xl:justify-between
                    "
                  >
                  <MockExamNavigation
                    onPrevious={
                      handlePrevious
                    }

                    onNext={
                      handleNext
                    }

                    disablePrevious={
                      currentIndex === 0
                    }

                    disableNext={
                      currentIndex ===
                      questions.length - 1
                    }
                  />

                  <button
                    onClick={
                      handleSubmit
                    }

                    disabled={
                      !selectedOption ||
                      answered ||
                      submitting
                    }

                    className="
                      w-full
                      rounded-2xl
                      bg-gradient-to-r
                      from-indigo-600
                      via-violet-600
                      to-fuchsia-600
                      px-8
                      py-4
                      font-bold
                      text-white
                      shadow-2xl
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:shadow-fuchsia-500/20
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >

                    {submitting
                      ? "Respondendo..."

                      : answered
                      ? "Respondida"

                      : "Responder"}

                  </button>

                </div>

                {/* MOBILE FINISH BUTTON */}
                <div
                  className="
                    mt-4

                    xl:hidden
                  "
                >

                  <button
                    onClick={
                      handleFinishExam
                    }

                    disabled={
                      answeredQuestions.length !==
                      questions.length
                    }

                    className="
                      w-full
                      rounded-2xl
                      bg-gradient-to-r
                      from-green-500
                      to-emerald-500
                      px-6
                      py-4
                      font-bold
                      text-white
                      shadow-2xl
                      transition-all
                      duration-300
                      hover:scale-[1.01]
                      hover:shadow-green-500/20
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >

                    Finalizar Simulado

                  </button>

                </div>

              </div>

            </div>

              <div
                className="
                  order-first

                  xl:order-none
                  xl:col-span-3
                "
                >
                <div
                  className="
                    space-y-6

                    xl:sticky
                    xl:top-8
                  "
                >
                <div
                  className="
                    rounded-[32px]
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-xl

                    dark:border-white/10
                    dark:bg-slate-900
                  "
                >

                  <div className="mb-6">

                    <h3
                      className="
                        text-xl
                        font-black
                        text-gray-900

                        dark:text-white
                      "
                    >

                      Navegação

                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      Selecione qualquer
                      questão rapidamente.

                    </p>

                  </div>

                  <MockQuestionNavigator
                    totalQuestions={
                      questions.length
                    }

                    currentIndex={
                      currentIndex
                    }

                    answeredQuestions={
                      answeredQuestions
                    }

                    onSelectQuestion={
                      setCurrentIndex
                    }
                  />

                </div>

                <div
                  className="
                    rounded-[32px]
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-xl

                    dark:border-white/10
                    dark:bg-slate-900
                  "
                >

                  <div className="flex items-center gap-3">

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
                      "
                    >

                      <Target className="h-6 w-6" />

                    </div>

                    <div>

                      <div
                        className="
                          text-sm
                          text-gray-500

                          dark:text-gray-400
                        "
                      >

                        Progresso

                      </div>

                      <div
                        className="
                          text-2xl
                          font-black
                          text-gray-900

                          dark:text-white
                        "
                      >

                        {
                          answeredQuestions.length
                        }
                        /
                        {
                          questions.length
                        }

                      </div>

                    </div>

                  </div>

                  <div
                    className="
                      mt-6
                      h-3
                      overflow-hidden
                      rounded-full
                      bg-gray-100

                      dark:bg-slate-800
                    "
                  >

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-500
                        via-violet-500
                        to-fuchsia-500
                        transition-all
                        duration-500
                      "
                      style={{
                        width: `${
                          (
                            answeredQuestions.length /
                            questions.length
                          ) * 100
                        }%`,
                      }}
                    />

                  </div>

                  <div className="mt-8 space-y-4">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-4

                        dark:border-white/10
                        dark:bg-slate-950
                      "
                    >

                      <div className="flex items-center gap-3">

                        <CheckCircle2
                          className="
                            h-5
                            w-5
                            text-green-500
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                            text-gray-700

                            dark:text-gray-300
                          "
                        >

                          Respondidas

                        </span>

                      </div>

                      <span
                        className="
                          text-lg
                          font-black
                          text-gray-900

                          dark:text-white
                        "
                      >

                        {
                          answeredQuestions.length
                        }

                      </span>

                    </div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-4

                        dark:border-white/10
                        dark:bg-slate-950
                      "
                    >

                      <div className="flex items-center gap-3">

                        <Trophy
                          className="
                            h-5
                            w-5
                            text-yellow-500
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                            text-gray-700

                            dark:text-gray-300
                          "
                        >

                          Restantes

                        </span>

                      </div>

                      <span
                        className="
                          text-lg
                          font-black
                          text-gray-900

                          dark:text-white
                        "
                      >

                        {
                          questions.length -
                          answeredQuestions.length
                        }

                      </span>

                    </div>

                  </div>

                  <button
                    onClick={
                      handleFinishExam
                    }

                    disabled={
                      answeredQuestions.length !==
                      questions.length
                    }

                    className="
                      mt-8
                      hidden
                      w-full
                      xl:block
                      rounded-2xl
                      bg-gradient-to-r
                      from-green-500
                      to-emerald-500
                      px-6
                      py-4
                      font-bold
                      text-white
                      shadow-2xl
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:shadow-green-500/20
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >

                    Finalizar Simulado

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      

      </div>

    </AppShell>
  );
}