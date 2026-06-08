"use client";


import { useUserProgress } from "@/hooks/queries/use-user-progress";

export function UserProgressCard() {

  const {
      data: progress,
      isLoading: loading,
  } = useUserProgress();
  

  if (loading || !progress) {

    return null;
  }

  const currentLevelXp =
    progress.xp % 500;

  const progressPercentage =
    (currentLevelXp / 500) * 100;

  return (

    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-2xl">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl text-white shadow-xl">

              ⭐

            </div>

            <div>

              <div className="text-sm text-gray-500 dark:text-gray-400">

                Level

              </div>

              <div className="text-3xl font-bold text-gray-900 dark:text-white">

                {progress.level}

              </div>

            </div>

          </div>

        </div>

        <div className="flex-1">

          <div className="mb-2 flex items-center justify-between text-sm">

            <span className="font-medium text-gray-800 dark:text-gray-200">

              ⚡ {progress.xp} XP

            </span>

            <span className="text-gray-500 dark:text-gray-400">

              {currentLevelXp} / 500

            </span>

          </div>

          <div className="h-4 rounded-full bg-gray-100 dark:bg-slate-800">

            <div
              className="h-4 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-700"

              style={{
                width:
                  `${progressPercentage}%`,
              }}
            />

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-gray-50 px-5 py-4 text-center transition-colors duration-500 dark:bg-slate-800">

            <div className="text-sm text-gray-500 dark:text-gray-400">

              🎯 Precisão

            </div>

            <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">

              {progress.accuracy}%

            </div>

          </div>

          <div className="rounded-2xl bg-gray-50 px-5 py-4 text-center transition-colors duration-500 dark:bg-slate-800">

            <div className="text-sm text-gray-500 dark:text-gray-400">

              📘 Explicações IA

            </div>

            <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">

              {progress.ai_explanations_used}

            </div>

          </div>

          <div className="rounded-2xl bg-gray-50 px-5 py-4 text-center transition-colors duration-500 dark:bg-slate-800">

          <div className="text-sm text-gray-500 dark:text-gray-400">

            💡 Dicas IA

          </div>

          <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">

            {progress.ai_hints_used}

          </div>
          

        </div>

        </div>

      </div>

    </div>
  );
}