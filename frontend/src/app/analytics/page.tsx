"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Brain,
  Flame,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";

import { AppShell } from "@/components/layout/app-shell";

import { Topbar } from "@/components/layout/topbar";

import { useAnalyticsOverview } from "@/hooks/queries/use-analytics-overview";
import { useAnalyticsProgress } from "@/hooks/queries/use-analytics-progress";
import { useAnalyticsSubjects } from "@/hooks/queries/use-analytics-subjects";


export default function AnalyticsPage() {

  const {
    data: overview,
    isLoading: loadingOverview,
  } = useAnalyticsOverview();
  
  const {
    data: progress,
  } = useAnalyticsProgress();
  
  const {
    data: subjects,
  } = useAnalyticsSubjects();
  
  const performanceData =
    progress?.map(
      (
        item: {
          date: string;
          accuracy: number;
        },
      ) => ({
        day: item.date.slice(5),
        accuracy: item.accuracy,
      }),
    ) ?? [];
  
  if (loadingOverview) {
  
    return null;
  }

  return (

    <AppShell>

      <Topbar
        title="Analytics Inteligente"
        description="Acompanhe sua evolução e receba insights baseados em IA."
      />

      <div className="mx-auto max-w-7xl">

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-gray-200
            bg-white
            p-10
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
              left-0
              top-0
              h-96
              w-96
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
              h-96
              w-96
              rounded-full
              bg-fuchsia-500/10
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                mb-14
                flex
                flex-col
                gap-6

                lg:flex-row
                lg:items-center
                lg:justify-between
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

                  AI Insights

                </div>

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

                  Evolução Inteligente

                </h1>

                <p
                  className="
                    mt-5
                    max-w-3xl
                    text-lg
                    leading-9
                    text-gray-600

                    dark:text-gray-400
                  "
                >

                  Visualize métricas avançadas,
                  identifique padrões e otimize
                  seus estudos com IA.

                </p>

              </div>

              <div
                className="
                  rounded-[32px]
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  p-8
                  shadow-2xl
                "
              >

                <div className="flex items-center gap-5">

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
                      to-fuchsia-500
                      text-white
                      shadow-2xl
                    "
                  >

                    <Trophy className="h-10 w-10" />

                  </div>

                  <div>

                    <div
                      className="
                        text-sm
                        text-indigo-600

                        dark:text-indigo-300
                      "
                    >

                      Precisão atual

                    </div>

                    <div
                      className="
                        mt-2
                        text-5xl
                        font-black
                        text-gray-900

                        dark:text-white
                      "
                    >

                    {overview?.accuracy ?? 0}%

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div
              className="
                grid
                gap-6

                lg:grid-cols-4
              "
            >

              {[
                {
                  icon: Target,
                  title: "Precisão",
                  value: `${overview?.accuracy ?? 0}%`,
                  color: "text-indigo-500",
                },
              
                {
                  icon: Brain,
                  title: "Questões",
                  value: String(
                    overview?.total_questions ?? 0,
                  ),
                  color: "text-fuchsia-500",
                },
              
                {
                  icon: Flame,
                  title: "Streak",
                  value: `${overview?.streak_days ?? 0} dias`,
                  color: "text-orange-500",
                },
              
                {
                  icon: Trophy,
                  title: "XP",
                  value: String(
                    overview?.xp ?? 0,
                  ),
                  color: "text-yellow-500",
                },
              ].map((item) => {

                const Icon =
                  item.icon;

                return (

                  <motion.div
                    whileHover={{
                      y: -4,
                    }}

                    key={item.title}

                    className="
                      rounded-[30px]
                      border
                      border-gray-200
                      bg-white
                      p-7
                      shadow-xl

                      dark:border-white/10
                      dark:bg-slate-950/60
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div
                        className={`
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-3xl
                          bg-gradient-to-br
                          from-white
                          to-gray-100
                          shadow-lg

                          dark:from-slate-900
                          dark:to-slate-800
                        `}
                      >

                        <Icon
                          className={`h-8 w-8 ${item.color}`}
                        />

                      </div>

                    </div>

                    <div
                      className="
                        mt-8
                        text-5xl
                        font-black
                        tracking-tight
                        text-gray-900

                        dark:text-white
                      "
                    >

                      {item.value}

                    </div>

                    <div
                      className="
                        mt-3
                        text-lg
                        font-semibold
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      {item.title}

                    </div>

                  </motion.div>

                );
              })}

            </div>

            <div
              className="
                mt-10
                grid
                gap-8

                xl:grid-cols-[1.4fr_0.6fr]
              "
            >

              <div
                className="
                  rounded-[36px]
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-2xl

                  dark:border-white/10
                  dark:bg-slate-950/60
                "
              >

                <div className="mb-8">

                  <div
                    className="
                      text-3xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    Evolução Histórica

                  </div>

                  <p
                    className="
                      mt-3
                      text-gray-500

                      dark:text-gray-400
                    "
                  >

                    Sua taxa de acertos aumentou
                    significativamente esta semana.

                  </p>

                </div>

                <div className="h-[420px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={performanceData}
                    >

                      <defs>

                        <linearGradient
                          id="colorAccuracy"

                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        strokeOpacity={0.1}
                      />

                      <XAxis dataKey="day" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorAccuracy)"
                        strokeWidth={4}
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </div>

              <div className="space-y-8">

                <div
                  className="
                    rounded-[36px]
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    p-8
                    shadow-2xl
                  "
                >

                  <div className="flex items-start gap-5">

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

                      <Brain className="h-8 w-8" />

                    </div>

                    <div>

                      <div
                        className="
                          text-2xl
                          font-black
                          text-indigo-700

                          dark:text-indigo-300
                        "
                      >

                        AI Insight

                      </div>

                      <p
                        className="
                          mt-4
                          leading-8
                          text-indigo-600

                          dark:text-indigo-200/80
                        "
                      >

                        Precisão atual de
                        {` ${overview?.accuracy ?? 0}% `}
                        com
                        {` ${overview?.total_questions ?? 0} `}
                        questões respondidas.
                        Continue praticando para
                        aumentar seu nível.

                      </p>

                    </div>

                  </div>

                </div>

                <div
                  className="
                    rounded-[36px]
                    border
                    border-gray-200
                    bg-white
                    p-8
                    shadow-2xl

                    dark:border-white/10
                    dark:bg-slate-950/60
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-black
                      text-gray-900

                      dark:text-white
                    "
                  >

                    Recomendações

                  </div>

                  <div className="mt-8 space-y-5">

                    {[
                      `🏆 Nível atual: ${overview?.level ?? 1}`,
                      `⚡ XP acumulado: ${overview?.xp ?? 0}`,
                      `🎯 Precisão: ${overview?.accuracy ?? 0}%`,
                    ].map((item) => (

                      <div
                        key={item}

                        className="
                          rounded-2xl
                          border
                          border-gray-200
                          bg-gray-50
                          px-5
                          py-4
                          text-lg
                          font-semibold
                          text-gray-700

                          dark:border-white/10
                          dark:bg-slate-900
                          dark:text-gray-300
                        "
                      >

                        {item}

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              <div
                className="
                  rounded-[36px]
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-2xl

                  dark:border-white/10
                  dark:bg-slate-950/60
                "
              >

                <div
                  className="
                    text-2xl
                    font-black
                    text-gray-900

                    dark:text-white
                  "
                >
                  Desempenho por Matéria
                </div>

                <div className="mt-6 space-y-4">

                  {subjects?.map(
                    (
                      subject: {
                        subject: string;
                        accuracy: number;
                      },
                    ) => (

                      <div
                        key={subject.subject}
                      >

                        <div className="mb-2 flex justify-between">

                          <span>
                            {subject.subject}
                          </span>

                          <span>
                            {subject.accuracy}%
                          </span>

                        </div>

                        <div className="h-3 rounded-full bg-gray-200">

                          <div
                            className="h-3 rounded-full bg-indigo-500"
                            style={{
                              width: `${subject.accuracy}%`,
                            }}
                          />

                        </div>

                      </div>

                    ),
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AppShell>
  );
}