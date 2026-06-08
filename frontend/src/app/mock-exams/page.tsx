"use client";

import { motion } from "framer-motion";

import {
  BrainCircuit,
  Sparkles,
  Trophy,
  Wand2,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";

import { MockExamConfig } from "@/components/mock-exam/mock-exam-config";

import { Topbar } from "@/components/layout/topbar";

export default function MockExamsPage() {

  return (

    <AppShell>

      <Topbar
        title="Simulados Inteligentes"
        description="Crie simulados personalizados e evolua com IA."
      />

      <div className="relative overflow-hidden">

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

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.5,
              }}
            >

              <div
                className="
                  mb-6
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

                  dark:border-indigo-400/20
                  dark:bg-indigo-400/10
                  dark:text-indigo-300
                "
              >

                <Sparkles className="h-4 w-4" />

                Simulados com IA

              </div>

              <h1
                className="
                  text-5xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-gray-900

                  dark:text-white

                  xl:text-7xl
                "
              >

                Crie simulados
                {" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-indigo-400
                    via-violet-400
                    to-fuchsia-400
                    bg-clip-text
                    text-transparent
                  "
                >

                  inteligentes

                </span>

              </h1>

              <p
                className="
                  mt-8
                  max-w-2xl
                  text-xl
                  leading-9
                  text-gray-500

                  dark:text-gray-300
                "
              >

                Gere simulados personalizados com
                inteligência artificial, controle de
                dificuldade e feedback instantâneo
                para acelerar seu aprendizado.

              </p>

              <div className="mt-14 grid gap-6 sm:grid-cols-3">

                <div
                  className="
                    group
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-lg
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-indigo-500/30
                    hover:shadow-2xl
                    hover:shadow-indigo-500/10

                    dark:border-white/10
                    dark:bg-gradient-to-br
                    dark:from-slate-900
                    dark:to-slate-950
                  "
                >

                  <BrainCircuit
                    className="
                      h-8
                      w-8
                      text-indigo-400
                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      mt-5
                      text-3xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    IA

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Questões inteligentes
                    com adaptação dinâmica.

                  </p>

                </div>

                <div
                  className="
                    group
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-lg
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-yellow-500/30
                    hover:shadow-2xl
                    hover:shadow-yellow-500/10

                    dark:border-white/10
                    dark:bg-gradient-to-br
                    dark:from-slate-900
                    dark:to-slate-950
                  "
                >

                  <Trophy
                    className="
                      h-8
                      w-8
                      text-yellow-400
                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      mt-5
                      text-3xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    XP

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Evolução gamificada
                    com progressão contínua.

                  </p>

                </div>

                <div
                  className="
                    group
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-lg
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-fuchsia-500/30
                    hover:shadow-2xl
                    hover:shadow-fuchsia-500/10

                    dark:border-white/10
                    dark:bg-gradient-to-br
                    dark:from-slate-900
                    dark:to-slate-950
                  "
                >

                  <Wand2
                    className="
                      h-8
                      w-8
                      text-fuchsia-400
                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      mt-5
                      text-3xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    Custom

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Simulados totalmente
                    personalizados.

                  </p>

                </div>

              </div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.5,
              }}

              className="flex justify-center"
            >

              <div className="w-full max-w-2xl">

                <MockExamConfig />

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </AppShell>
  );
}