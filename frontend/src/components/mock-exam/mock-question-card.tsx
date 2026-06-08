"use client";

import {
  Brain,
  Sparkles,
} from "lucide-react";

interface Props {
  statement: string;
}

export function MockQuestionCard({
  statement,
}: Props) {

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-gray-200
        bg-gradient-to-br
        from-white
        via-gray-50
        to-indigo-50
        p-8
        shadow-xl

        dark:border-white/10
        dark:from-slate-900
        dark:via-slate-900
        dark:to-indigo-950/20
      "
    >

      <div
        className="
          absolute
          right-0
          top-0
          h-40
          w-40
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

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

            <Brain className="h-4 w-4" />

            Questão Inteligente

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-fuchsia-500
              text-white
              shadow-lg
            "
          >

            <Sparkles className="h-5 w-5" />

          </div>

        </div>

        <div className="mt-8">

          <h2
            className="
              text-3xl
              font-black
              leading-[1.4]
              tracking-tight
              text-gray-900

              dark:text-white
            "
          >

            {statement}

          </h2>

        </div>

      </div>

    </div>

  );
}