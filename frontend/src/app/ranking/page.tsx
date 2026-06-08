"use client";

import {
  motion,
} from "framer-motion";

import {
  BookOpen,
  Crown,
  Medal,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";

import {
  AppShell,
} from "@/components/layout/app-shell";

import {
  Topbar,
} from "@/components/layout/topbar";

import {
  PageLoader,
} from "@/components/common/page-loader";

import {
  useRanking,
} from "@/hooks/queries/use-ranking";

export default function RankingPage() {
  const {
    data: leaderboard = [],
    isLoading,
  } = useRanking();

  const topThree =
    leaderboard.slice(
      0,
      3,
    );

  const currentUser =
    leaderboard.find(
      (user) =>
        user.name === "Você",
    ) ??
    leaderboard[0];

  if (isLoading) {
    return (
      <AppShell>
        <PageLoader />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Topbar
        title="Ranking Global"
        description="Acompanhe sua posição e dispute com outros estudantes."
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
            p-6
            shadow-2xl

            md:p-10

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
                mb-10
                flex
                flex-col
                gap-6

                lg:mb-14
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
                    border-yellow-500/20
                    bg-yellow-500/10
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-yellow-600

                    dark:text-yellow-300
                  "
                >
                  <Sparkles className="h-4 w-4" />
                  Competitive Learning
                </div>

                <h1
                  className="
                    mt-6
                    text-4xl
                    font-black
                    tracking-tight
                    text-gray-900

                    md:text-5xl
                    dark:text-white
                  "
                >
                  Os melhores estudantes
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
                  Ganhe XP, aumente seu nível e acompanhe sua evolução no
                  ranking global.
                </p>
              </div>

              <div
                className="
                  rounded-[32px]
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  p-6
                  shadow-2xl

                  md:p-8
                "
              >
                <div className="flex items-center gap-4">
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

                      md:h-20
                      md:w-20
                    "
                  >
                    <Trophy className="h-8 w-8 md:h-10 md:w-10" />
                  </div>

                  <div>
                    <div
                      className="
                        text-sm
                        text-indigo-600

                        dark:text-indigo-300
                      "
                    >
                      Sua posição
                    </div>

                    <div
                      className="
                        mt-2
                        text-4xl
                        font-black
                        text-gray-900

                        md:text-5xl
                        dark:text-white
                      "
                    >
                      #{currentUser?.position ?? "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <div
                className="
                  rounded-[32px]
                  border
                  border-gray-200
                  bg-gray-50
                  p-8
                  text-center
                  text-gray-600

                  dark:border-white/10
                  dark:bg-slate-950/60
                  dark:text-gray-300
                "
              >
                Nenhum usuário ranqueado ainda.
              </div>
            ) : (
              <>
                <div
                  className="
                    grid
                    gap-8

                    lg:grid-cols-3
                  "
                >
                  {topThree.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{
                        y: -5,
                      }}
                      className={`
                        relative
                        overflow-hidden
                        rounded-[32px]
                        border
                        p-8
                        shadow-2xl

                        ${
                          user.position === 1
                            ? `
                              border-yellow-300
                              bg-gradient-to-br
                              from-yellow-50
                              to-white

                              dark:border-yellow-500/20
                              dark:from-yellow-500/10
                              dark:to-slate-950
                            `
                            : `
                              border-gray-200
                              bg-white

                              dark:border-white/10
                              dark:bg-slate-950/60
                            `
                        }
                      `}
                    >
                      <div className="absolute right-6 top-6">
                        {user.position === 1 && (
                          <Crown
                            className="
                              h-8
                              w-8
                              text-yellow-500
                            "
                          />
                        )}

                        {user.position === 2 && (
                          <Medal
                            className="
                              h-8
                              w-8
                              text-gray-400
                            "
                          />
                        )}

                        {user.position === 3 && (
                          <Medal
                            className="
                              h-8
                              w-8
                              text-amber-700
                            "
                          />
                        )}
                      </div>

                      <div
                        className="
                          flex
                          h-24
                          w-24
                          items-center
                          justify-center
                          rounded-[28px]
                          bg-gradient-to-br
                          from-indigo-500
                          via-violet-500
                          to-fuchsia-500
                          text-3xl
                          font-black
                          text-white
                          shadow-2xl
                        "
                      >
                        {user.name.charAt(0)}
                      </div>

                      <div
                        className="
                          mt-8
                          text-4xl
                          font-black
                          text-gray-900

                          dark:text-white
                        "
                      >
                        #{user.position}
                      </div>

                      <div
                        className="
                          mt-3
                          text-2xl
                          font-bold
                          text-gray-800

                          dark:text-gray-200
                        "
                      >
                        {user.name}
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
                            px-5
                            py-4

                            dark:border-white/10
                            dark:bg-slate-950/60
                          "
                        >
                          <div className="flex items-center gap-3">
                            <Star className="h-5 w-5 text-yellow-500" />

                            <span
                              className="
                                font-semibold
                                text-gray-700

                                dark:text-gray-300
                              "
                            >
                              XP
                            </span>
                          </div>

                          <div
                            className="
                              text-xl
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >
                            {user.xp}
                          </div>
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
                            px-5
                            py-4

                            dark:border-white/10
                            dark:bg-slate-950/60
                          "
                        >
                          <div className="flex items-center gap-3">
                            <Trophy className="h-5 w-5 text-indigo-500" />

                            <span
                              className="
                                font-semibold
                                text-gray-700

                                dark:text-gray-300
                              "
                            >
                              Precisão
                            </span>
                          </div>

                          <div
                            className="
                              text-xl
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >
                            {user.accuracy}%
                          </div>
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
                            px-5
                            py-4

                            dark:border-white/10
                            dark:bg-slate-950/60
                          "
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-emerald-500" />

                            <span
                              className="
                                font-semibold
                                text-gray-700

                                dark:text-gray-300
                              "
                            >
                              Questões
                            </span>
                          </div>

                          <div
                            className="
                              text-xl
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >
                            {user.total_questions}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-14">
                  <div
                    className="
                      overflow-hidden
                      rounded-[32px]
                      border
                      border-gray-200
                      bg-white
                      shadow-2xl

                      dark:border-white/10
                      dark:bg-slate-950/60
                    "
                  >
                    <div
                      className="
                        border-b
                        border-gray-200
                        px-6
                        py-6

                        md:px-8
                        dark:border-white/10
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
                        Ranking Completo
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-white/10">
                      {leaderboard.map((user) => (
                        <div
                          key={user.id}
                          className="
                            flex
                            flex-col
                            gap-5
                            px-6
                            py-6
                            transition-all
                            duration-300
                            hover:bg-gray-50

                            md:flex-row
                            md:items-center
                            md:justify-between
                            md:px-8

                            dark:hover:bg-white/[0.03]
                          "
                        >
                          <div className="flex items-center gap-5 md:gap-6">
                            <div
                              className="
                                text-2xl
                                font-black
                                text-gray-900

                                dark:text-white
                              "
                            >
                              #{user.position}
                            </div>

                            <div
                              className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-indigo-500
                                to-fuchsia-500
                                font-black
                                text-white
                              "
                            >
                              {user.name.charAt(0)}
                            </div>

                            <div className="min-w-0">
                              <div
                                className="
                                  truncate
                                  text-lg
                                  font-bold
                                  text-gray-900

                                  dark:text-white
                                "
                              >
                                {user.name}
                              </div>

                              <div
                                className="
                                  mt-1
                                  text-sm
                                  text-gray-500

                                  dark:text-gray-400
                                "
                              >
                                Nível {user.level} • {user.accuracy}% precisão
                              </div>
                            </div>
                          </div>

                          <div
                            className="
                              grid
                              grid-cols-3
                              gap-4

                              md:flex
                              md:items-center
                              md:gap-10
                            "
                          >
                            <div className="text-left md:text-right">
                              <div
                                className="
                                  text-sm
                                  text-gray-500

                                  dark:text-gray-400
                                "
                              >
                                XP
                              </div>

                              <div
                                className="
                                  text-lg
                                  font-black
                                  text-gray-900

                                  md:text-xl
                                  dark:text-white
                                "
                              >
                                {user.xp}
                              </div>
                            </div>

                            <div className="text-left md:text-right">
                              <div
                                className="
                                  text-sm
                                  text-gray-500

                                  dark:text-gray-400
                                "
                              >
                                Nível
                              </div>

                              <div
                                className="
                                  text-lg
                                  font-black
                                  text-indigo-500

                                  md:text-xl
                                "
                              >
                                {user.level}
                              </div>
                            </div>

                            <div className="text-left md:text-right">
                              <div
                                className="
                                  text-sm
                                  text-gray-500

                                  dark:text-gray-400
                                "
                              >
                                Questões
                              </div>

                              <div
                                className="
                                  text-lg
                                  font-black
                                  text-emerald-500

                                  md:text-xl
                                "
                              >
                                {user.total_questions}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}