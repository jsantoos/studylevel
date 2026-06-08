"use client";

import {
  useRouter,
} from "next/navigation";

import {
  AppShell,
} from "@/components/layout/app-shell";

import {
  Topbar,
} from "@/components/layout/topbar";

import {
  MetricCard,
} from "@/components/dashboard/metric-card";

import {
  DailyMissionsCard,
} from "@/components/dashboard/daily-missions-card";

import {
  PageLoader,
} from "@/components/common/page-loader";

import {
  UserProgressCard,
} from "@/components/gamification/user-progress-card";

import {
  useDailyMissions,
} from "@/hooks/queries/use-daily-missions";

import {
  useUserProgress,
} from "@/hooks/queries/use-user-progress";

import {
  useRouteLoader,
} from "@/providers/route-loader-provider";


export default function DashboardPage() {
  const router =
    useRouter();

  const {
    showLoader,
  } = useRouteLoader();

  const {
    data: progress,
    isLoading: isProgressLoading,
  } = useUserProgress();
  
  console.log("PROGRESS", progress);
  const {
    data: dailyMissions,
    isLoading: isMissionsLoading,
  } = useDailyMissions();

  const isLoading =
    isProgressLoading ||
    isMissionsLoading;


  if (isLoading) {
    return (
      <AppShell>
        <PageLoader />
      </AppShell>
    );
  }

  const wrongQuestions =
    (progress?.total_questions ?? 0)
    - (progress?.correct_questions ?? 0);
  return (
    <AppShell>
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        <div className="space-y-10">
          <Topbar
            title="Dashboard"
            description="Acompanhe sua evolução diária."
          />

          <UserProgressCard />

          <section
            className="
              flex
              flex-col
              gap-4

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                Sua Evolução
              </h2>

              <p className="mt-2 text-lg text-gray-500">
                Continue evoluindo e complete desafios
                para subir de nível mais rápido.
              </p>
            </div>

            <button
              onClick={() => {
                showLoader();

                router.push(
                  "/mock-exams",
                );
              }}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-fuchsia-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-fuchsia-500/20
              "
            >
              Novo Simulado
            </button>
          </section>

          <section
            className="
              grid
              gap-6

              md:grid-cols-2
              xl:grid-cols-5
            "
          >
            <MetricCard
              title="Simulados"
              value={String(
                progress?.total_mock_exams ?? 0,
              )}
              description="Simulados concluídos"
            />

            <MetricCard
              title="Questões"
              value={String(
                progress?.total_questions ?? 0,
              )}
              description="Questões respondidas"
            />
            <MetricCard
              title="Acertos"
              value={String(
                progress?.correct_questions ?? 0,
              )}
              description="Questões respondidas corretamente"
            />
            <MetricCard
              title="Erros"
              value={String(
                wrongQuestions,
              )}
              description="Questões respondidas incorretamente"
            />
            <MetricCard
              title="Tempo Médio"
              value={`${progress?.average_response_time ?? 0}s`}
              description="Tempo médio por questão"
            />

          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                Missões Diárias
              </h2>

              <p className="mt-2 text-lg text-gray-500">
                Complete missões para ganhar XP,
                aumentar sua sequência e evoluir mais rápido.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {dailyMissions?.map(
                (mission) => (
                  <DailyMissionsCard
                    key={mission.id}
                    title={
                      mission.mission.title
                    }
                    progress={
                      mission.progress
                    }
                    goal={
                      mission.mission.goal
                    }
                    rewardXp={
                      mission.mission.reward_xp
                    }
                    completed={
                      mission.completed
                    }
                  />
                ),
              )}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}