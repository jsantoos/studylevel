"use client";

import {
  useState,
} from "react";

import {
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import {
  useGenerateExplanation,
} from "@/hooks/mutations/use-generate-explanation";

interface Props {
  questionId: string;
  selectedOptionId: string;
  officialExplanation?: string | null;
}

export function AIExplanationCard({
  questionId,
  selectedOptionId,
  officialExplanation,
}: Props) {
  const [
    aiExplanation,
    setAIExplanation,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const {
    mutateAsync,
  } = useGenerateExplanation();

  async function handleGenerateExplanation() {
    if (aiExplanation || loading) {
      return;
    }

    if (
      !questionId ||
      !selectedOptionId
    ) {
      setAIExplanation(
        "⚠️ Dados da questão inválidos.",
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await mutateAsync({
          questionId,
          selectedOptionId,
          forceAI: true,
        });

      setAIExplanation(
        response.explanation,
      );
    } catch {
      setAIExplanation(
        "⚠️ Não foi possível gerar a explicação. Tente novamente em alguns instantes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        rounded-[32px]
        border
        border-sky-200
        bg-gradient-to-br
        from-sky-50
        via-blue-50
        to-indigo-50
        p-5
        shadow-sm

        md:p-6

        dark:border-white/10
        dark:from-slate-900
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-cyan-100
            text-cyan-700

            dark:bg-cyan-500/10
            dark:text-cyan-300
          "
        >
          <BrainCircuit className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-cyan-700

              dark:text-cyan-300
            "
          >
            Assistente Inteligente
          </p>

          <h3
            className="
              text-xl
              font-black
              tracking-tight
              text-slate-950

              dark:text-white
            "
          >
            Explicação Inteligente
          </h3>
        </div>
      </div>

      {officialExplanation ? (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-blue-200
            bg-white
            p-5
            shadow-sm

            dark:border-blue-500/20
            dark:bg-blue-950/20
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              font-bold
              text-blue-700

              dark:text-blue-300
            "
          >
            <BookOpen className="h-4 w-4" />
            📚 Explicação Oficial
          </div>

          <p
            className="
              text-sm
              leading-7
              text-slate-700

              dark:text-slate-300
            "
          >
            {officialExplanation}
          </p>
        </div>
      ) : (
        !aiExplanation && (
          <div
            className="
              mt-5
              rounded-2xl
              border
              border-amber-200
              bg-amber-50
              p-5

              dark:border-yellow-500/20
              dark:bg-yellow-950/10
            "
          >
            <div
              className="
                flex
                gap-3
                text-sm
                leading-6
                text-amber-800

                dark:text-yellow-200
              "
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

              <span>
                Nenhuma explicação oficial foi cadastrada para esta questão.
              </span>
            </div>
          </div>
        )
      )}

      {!aiExplanation && !loading && (
        <button
          onClick={handleGenerateExplanation}
          className="
            mt-5
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-indigo-500
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-blue-500/20
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-blue-500/30
            active:scale-[0.99]

            md:w-auto
          "
        >
          <Sparkles className="h-4 w-4" />

          {officialExplanation
            ? "Aprofundar com IA"
            : "Gerar explicação com IA"}
        </button>
      )}

      {loading && (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-cyan-200
            bg-cyan-50
            p-5
            shadow-sm

            dark:border-cyan-500/20
            dark:bg-cyan-950/20
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              font-bold
              text-cyan-800

              dark:text-cyan-300
            "
          >
            <div
              className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-cyan-300
                border-t-cyan-700

                dark:border-cyan-300/30
                dark:border-t-cyan-300
              "
            />

            A IA está analisando sua resposta...
          </div>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-slate-700

              dark:text-slate-300
            "
          >
            Entendendo por que a alternativa correta está certa e identificando
            possíveis falhas de raciocínio.
          </p>

          <p
            className="
              mt-2
              text-xs
              font-medium
              text-slate-500

              dark:text-slate-400
            "
          >
            Isso pode levar alguns segundos.
          </p>
        </div>
      )}

      {aiExplanation && (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            p-5
            shadow-sm

            dark:border-emerald-500/20
            dark:bg-emerald-950/20
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              font-bold
              text-emerald-700

              dark:text-emerald-300
            "
          >
            <Sparkles className="h-4 w-4" />
            ✨ Explicação Personalizada por IA
          </div>

          <p
            className="
              text-sm
              leading-7
              text-slate-700

              dark:text-slate-300
            "
          >
            {aiExplanation}
          </p>
        </div>
      )}
    </section>
  );
}