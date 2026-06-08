"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRouteLoader } from "@/providers/route-loader-provider";

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Sparkles,
  Target,
  Trophy,
  Zap,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export default function LandingPage() {

  const router = useRouter();
  const {
    showLoader,
  } = useRouteLoader();

  const features = [
    {
      icon: BrainCircuit,
      title: "Simulados Inteligentes",
      description:
        "A IA adapta perguntas ao seu nível e acelera sua evolução.",
    },

    {
      icon: Target,
      title: "Revisão Automática",
      description:
        "Entenda seus erros com explicações inteligentes e contextualizadas.",
    },

    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description:
        "Acompanhe desempenho, precisão e progresso em tempo real.",
    },

    {
      icon: Trophy,
      title: "Ranking Gamificado",
      description:
        "Ganhe XP, suba de nível e acompanhe sua evolução diária.",
    },
  ];

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

      <header
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-8
          py-8
        "
      >

        <Link
          href="/"

          className="
            flex
            items-center
            gap-4
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
              via-violet-500
              to-fuchsia-500
              text-xl
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
                text-2xl
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

        <div className="flex items-center gap-4">

        <button
          onClick={() => {

            showLoader();

            router.push("/login");
          }}

          className="
            group
            inline-flex
            items-center
            gap-3
            rounded-3xl
            bg-gradient-to-r
            from-indigo-500
            via-violet-500
            to-fuchsia-500
            px-8
            py-5
            text-lg
            font-black
            text-white
            shadow-2xl
            transition-all
            duration-300
            hover:scale-[1.03]
          "
        >

          Login

        </button>

        </div>

      </header>

      <section
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          gap-24
          px-8
          pb-24
          pt-20

          lg:grid-cols-2
          lg:items-center
        "
      >

        <div>

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
                mt-8
                text-6xl
                font-black
                leading-tight
                tracking-tight
                text-gray-900

                dark:text-white
              "
            >

              Aprenda com
              inteligência artificial.
              <br />

              Evolua todos os dias.

            </h1>

            <p
              className="
                mt-8
                max-w-2xl
                text-xl
                leading-8
                text-gray-600

                dark:text-gray-400
              "
            >

              Simulados inteligentes,
              revisão automática,
              analytics avançado
              e aprendizado adaptativo
              para acelerar sua evolução
              de forma personalizada.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/login"

                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-3xl
                  bg-gradient-to-r
                  from-indigo-500
                  via-violet-500
                  to-fuchsia-500
                  px-8
                  py-5
                  text-lg
                  font-black
                  text-white
                  shadow-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                "
              >

                Comece agora

                <ArrowRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </Link>

              <Link
                href="#features"

                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  px-8
                  py-5
                  text-lg
                  font-bold
                  text-gray-900
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.02]

                  dark:border-white/10
                  dark:bg-slate-900/60
                  dark:text-white
                "
              >

                Explorar recursos

              </Link>

            </div>

            <div className="mt-14 flex flex-wrap gap-8">

              {[
                {
                  icon: Rocket,
                  text: "+50k questões",
                },

                {
                  icon: Zap,
                  text: "IA adaptativa",
                },

                {
                  icon: ShieldCheck,
                  text: "Revisão inteligente",
                },
              ].map((item) => {

                const Icon =
                  item.icon;

                return (

                  <div
                    key={item.text}

                    className="
                      flex
                      items-center
                      gap-3
                      text-lg
                      font-semibold
                      text-gray-700

                      dark:text-gray-300
                    "
                  >

                    <Icon
                      className="
                        h-5
                        w-5
                        text-indigo-500
                      "
                    />

                    {item.text}

                  </div>

                );
              })}

            </div>

          </motion.div>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.6,
          }}
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-gray-200
              bg-white
              p-8
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

              <div className="flex items-center justify-between">

                <div>

                  <div
                    className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-wider
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Desempenho Médio

                  </div>

                  <div
                    className="
                      mt-2
                      text-6xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    92%

                  </div>

                  <p
                    className="
                      mt-4
                      max-w-sm
                      text-base
                      leading-7
                      text-gray-600

                      dark:text-gray-400
                    "
                  >

                    Seu desempenho aumenta
                    conforme a IA entende
                    seus pontos fracos
                    e adapta os simulados.

                  </p>

                </div>

                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-indigo-500
                    via-violet-500
                    to-fuchsia-500
                    text-white
                    shadow-2xl
                  "
                >

                  <Trophy className="h-9 w-9" />

                </div>

              </div>

              <div className="mt-12 space-y-5">

                {[
                  {
                    icon: BrainCircuit,
                    title: "Simulados Inteligentes",
                    value: "+120 sessões",
                  },

                  {
                    icon: Target,
                    title: "Precisão Média",
                    value: "89%",
                  },

                  {
                    icon: BarChart3,
                    title: "Analytics",
                    value: "Insights avançados",
                  },
                ].map((item) => {

                  const Icon =
                    item.icon;

                  return (

                    <div
                      key={item.title}

                      className="
                        flex
                        items-center
                        justify-between
                        rounded-3xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-5
                        transition-all
                        duration-300
                        hover:scale-[1.01]

                        dark:border-white/10
                        dark:bg-slate-900/60
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-indigo-500/10
                            to-fuchsia-500/10
                          "
                        >

                          <Icon
                            className="
                              h-6
                              w-6
                              text-indigo-500
                            "
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

                            {item.title}

                          </div>

                          <div
                            className="
                              mt-1
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

            </div>

          </div>

        </motion.div>

      </section>

      <section
        id="features"

        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-8
          pb-32
        "
      >

        <div className="text-center">

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

            🚀 Recursos Inteligentes

          </div>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              tracking-tight
              text-gray-900

              dark:text-white
            "
          >

            Tudo que você precisa
            para evoluir mais rápido

          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-xl
              leading-9
              text-gray-600

              dark:text-gray-400
            "
          >

            Uma plataforma moderna,
            gamificada e alimentada
            por inteligência artificial.

          </p>

        </div>

        <div
          className="
            mt-20
            grid
            gap-8

            md:grid-cols-2
          "
        >

          {features.map((feature) => {

            const Icon =
              feature.icon;

            return (

              <div
                key={feature.title}

                className="
                  rounded-[32px]
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl

                  dark:border-white/10
                  dark:bg-gradient-to-br
                  dark:from-slate-950
                  dark:to-slate-900
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
                    text-white
                    shadow-xl
                  "
                >

                  <Icon className="h-8 w-8" />

                </div>

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    tracking-tight
                    text-gray-900

                    dark:text-white
                  "
                >

                  {feature.title}

                </h3>

                <p
                  className="
                    mt-5
                    text-lg
                    leading-8
                    text-gray-600

                    dark:text-gray-400
                  "
                >

                  {feature.description}

                </p>

              </div>

            );
          })}

        </div>

      </section>

    </main>

  );
}