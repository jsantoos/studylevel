"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  BrainCircuit,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import api from "@/services/api/api";

;

import {
  useRouteLoader,
} from "@/providers/route-loader-provider";


export function MockExamConfig() {

  const router = useRouter();
  const {
    showLoader,
  } = useRouteLoader();

  const [questionCount, setQuestionCount] =
    useState(10);

  const [subject, setSubject] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleStartExam() {

    try {
  
      setLoading(true);
  
      showLoader();
  
      const payload = {
        question_count: questionCount,
  
        subject:
          subject || null,
  
        difficulty:
          difficulty
            ? Number(difficulty)
            : null,
      };
  
      const response =
        await api.post(
          "/mock-exams",
          payload,
        );
  
      router.push(
        `/mock-exams/${response.data.id}`,
      );
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Erro ao criar simulado.",
      );
  
      setLoading(false);
    }
  }

  return (

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
        duration: 0.4,
      }}

      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-gray-200
        bg-white/95
        p-8
        shadow-2xl
        backdrop-blur-xl
        transition-all
        duration-500

        dark:border-white/10
        dark:bg-slate-900/90
      "
    >

      <div
        className="
          absolute
          right-0
          top-0
          h-52
          w-52
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
          h-52
          w-52
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        <div className="mb-10">

          <div
            className="
              mb-5
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

              dark:border-indigo-400/20
              dark:bg-indigo-400/10
              dark:text-indigo-300
            "
          >

            <Sparkles className="h-4 w-4" />

            Configuração Inteligente

          </div>

          <h2
            className="
              text-4xl
              font-black
              tracking-tight
              text-gray-900

              dark:text-white
            "
          >

            Personalize seu simulado

          </h2>

          <p
            className="
              mt-4
              max-w-xl
              text-base
              leading-7
              text-gray-500

              dark:text-gray-400
            "
          >

            Escolha quantidade de questões,
            matéria e dificuldade para gerar
            um desafio alinhado ao seu nível
            de conhecimento.

          </p>

        </div>

        <div className="space-y-7">

          <div>

            <label
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-700

                dark:text-gray-300
              "
            >

              <Layers3 className="h-4 w-4" />

              Quantidade de questões

            </label>

            <input
              type="number"
              min={5}
              max={100}
              value={questionCount}
              onChange={(e) =>
                setQuestionCount(
                  Number(
                    e.target.value,
                  ),
                )
              }

              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                py-4
                text-lg
                font-medium
                text-gray-900
                outline-none
                transition-all
                duration-300

                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-500/10

                dark:border-white/10
                dark:bg-slate-950/60
                dark:text-white
                dark:placeholder:text-gray-500
                dark:focus:border-indigo-400
                dark:focus:ring-indigo-400/10
              "
            />

          </div>

          <div>

            <label
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-700

                dark:text-gray-300
              "
            >

              <BrainCircuit className="h-4 w-4" />

              Matéria

            </label>

            <select
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value,
                )
              }

              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                py-4
                text-base
                font-medium
                text-gray-900
                outline-none
                transition-all
                duration-300

                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-500/10

                dark:border-white/10
                dark:bg-slate-950/60
                dark:text-white
                dark:focus:border-indigo-400
                dark:focus:ring-indigo-400/10
              "
            >

            <option value="">
              Todas
            </option>

            <option value="Matemática">
              Matemática
            </option>

            <option value="Linguagens">
              Linguagens
            </option>

            <option value="Geografia">
              Geografia
            </option>

            <option value="História">
              História
            </option>

            <option value="Ciências da Natureza">
              Ciências da Natureza
            </option>

            <option value="Redação">
              Redação
            </option>

            <option value="Filosofia">
              Filosofia
            </option>

            <option value="Sociologia">
              Sociologia
            </option>

            </select>

          </div>

          <div>

            <label
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-gray-700

                dark:text-gray-300
              "
            >

              <Rocket className="h-4 w-4" />

              Dificuldade

            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value,
                )
              }

              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                py-4
                text-base
                font-medium
                text-gray-900
                outline-none
                transition-all
                duration-300

                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-500/10

                dark:border-white/10
                dark:bg-slate-950/60
                dark:text-white
                dark:focus:border-indigo-400
                dark:focus:ring-indigo-400/10
              "
            >

              <option value="">
                Todas
              </option>

              <option value="1">
                Fácil
              </option>

              <option value="2">
                Média
              </option>

              <option value="3">
                Difícil
              </option>

            </select>

          </div>

          <div className="pt-4">

            <button
              onClick={handleStartExam}

              disabled={loading}

              className="
                group
                relative
                w-full
                overflow-hidden
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
                shadow-2xl
                transition-all
                duration-300

                hover:scale-[1.02]
                hover:shadow-fuchsia-500/20

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <span className="relative z-10">

                {loading
                  ? "Criando simulado..."
                  : "Iniciar Simulado"}

              </span>

              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                  opacity-0
                  transition-opacity
                  duration-300

                  group-hover:opacity-100
                "
              />

            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}