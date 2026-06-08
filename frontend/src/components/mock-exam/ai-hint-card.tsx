"use client";

import { useState } from "react";

import {
  BrainCircuit,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import {
  useGenerateHint,
} from "@/hooks/mutations/use-generate-hint";

interface Props {
  question: string;
  alternatives: string[];
  difficulty: string;
  subject: string;
}

export function AIHintCard({
  question,
  alternatives,
  difficulty,
  subject,
}: Props) {
  

  const [hintsMap, setHintsMap] =
    useState<
      Record<string, string>
    >({});

  const {
    mutateAsync,
    isPending,
  } = useGenerateHint();

  const currentHint =
    hintsMap[question];

  const showHint =
    !!currentHint;

    async function handleGenerateHint() {

      if (currentHint) {
        return;
      }
    
      try {
    
        const response =
          await mutateAsync({
            question,
            alternatives,
            difficulty,
            subject,
          });
    
        setHintsMap(
          (prev) => ({
            ...prev,
    
            [question]:
              response.hint,
          }),
        );
    
      } catch (error) {
    
        console.error(error);
    
        setHintsMap(
          (prev) => ({
            ...prev,
    
            [question]:
              "Não foi possível gerar uma dica agora. Tente novamente em alguns instantes.",
          }),
        );
      }
    }

    return (
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-indigo-100
          bg-gradient-to-br
          from-indigo-50
          via-white
          to-fuchsia-50
          shadow-xl
          transition-all
          duration-500
    
          dark:border-indigo-500/10
          dark:from-slate-900
          dark:via-slate-900
          dark:to-indigo-950/30
        "
      >
        <div className="p-5 md:p-7">
          <div
            className="
              flex
              flex-col
              gap-5
    
              md:flex-row
              md:items-start
              md:justify-between
            "
          >
            <div
              className="
                flex
                min-w-0
                items-start
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-500
                  via-violet-500
                  to-fuchsia-500
                  text-white
                  shadow-lg
    
                  md:h-14
                  md:w-14
                "
              >
                <BrainCircuit className="h-6 w-6 md:h-7 md:w-7" />
              </div>
    
              <div className="min-w-0 flex-1">
                <div
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-indigo-600
    
                    dark:text-indigo-300
                  "
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
    
                  <span className="truncate">
                    Assistente Inteligente
                  </span>
                </div>
    
                <h3
                  className="
                    mt-4
                    text-3xl
                    font-black
                    leading-tight
                    tracking-tight
                    text-gray-900
    
                    md:text-4xl
                    dark:text-white
                  "
                >
                  💡 Dica da IA
                </h3>
    
                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-7
                    text-gray-600
    
                    dark:text-gray-400
                  "
                >
                  Receba uma orientação contextual para desbloquear seu raciocínio
                  sem revelar a resposta correta.
                </p>
              </div>
            </div>
    
            {!showHint && (
              <button
                onClick={handleGenerateHint}
                disabled={isPending}
                className="
                  flex
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-fuchsia-600
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-fuchsia-500/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
    
                  md:w-auto
                "
              >
                <Lightbulb className="h-4 w-4 shrink-0" />
    
                {isPending ? (
                  <>
                    <div
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />
    
                    Gerando dica...
                  </>
                ) : (
                  <>Gerar dica</>
                )}
              </button>
            )}
          </div>
    
          {isPending && (
            <div
              className="
                mt-6
                rounded-3xl
                border
                border-indigo-100
                bg-white
                p-5
                shadow-inner
    
                md:mt-8
                md:p-6
    
                dark:border-white/10
                dark:bg-slate-950/60
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    h-6
                    w-6
                    shrink-0
                    animate-spin
                    rounded-full
                    border-2
                    border-indigo-500/20
                    border-t-indigo-500
                  "
                />
    
                <div className="min-w-0">
                  <div
                    className="
                      font-semibold
                      text-gray-800
    
                      dark:text-white
                    "
                  >
                    A IA está analisando a questão...
                  </div>
    
                  <div
                    className="
                      mt-1
                      text-sm
                      text-gray-500
    
                      dark:text-gray-400
                    "
                  >
                    Isso pode levar alguns segundos.
                  </div>
                </div>
              </div>
            </div>
          )}
    
          {showHint && (
            <div
              className="
                mt-6
                rounded-3xl
                border
                border-indigo-100
                bg-white
                p-5
                shadow-inner
    
                md:mt-8
                md:p-6
    
                dark:border-white/10
                dark:bg-slate-950/60
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    mt-1
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-yellow-400
                    to-orange-500
                    text-white
                    shadow-lg
                  "
                >
                  <Lightbulb className="h-5 w-5" />
                </div>
    
                <div className="min-w-0 flex-1">
                  <div
                    className="
                      text-sm
                      font-bold
                      uppercase
                      tracking-wider
                      text-indigo-600
    
                      dark:text-indigo-300
                    "
                  >
                    Insight Estratégico
                  </div>
    
                  <p
                    className="
                      mt-4
                      text-base
                      leading-8
                      text-gray-700
    
                      dark:text-gray-300
                    "
                  >
                    {currentHint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}