interface Props {
  title: string;

  progress: number;

  goal: number;

  rewardXp: number;

  completed: boolean;
}

export function DailyMissionsCard({
  title,
  progress,
  goal,
  rewardXp,
  completed,
}: Props) {

  const percentage = Math.min(
    (progress / goal) * 100,
    100,
  );

  return (

    <div className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300

      dark:border-white/10
      dark:bg-slate-900
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h3 className="
          text-lg
          font-semibold
          text-gray-900
          dark:text-white
        ">
          🎯 {title}
        </h3>

        <span className="
          text-sm
          font-medium
          text-yellow-600
          dark:text-yellow-400
        ">
          +{rewardXp} XP
        </span>

      </div>

      <div className="mt-4">

        <div className="
          h-3
          overflow-hidden
          rounded-full
          bg-gray-100
          dark:bg-slate-800
        ">

          <div
            className={`h-full transition-all duration-500 ${
              completed
                ? "bg-green-500"
                : "bg-gradient-to-r from-indigo-500 to-fuchsia-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="
          mt-2
          flex
          items-center
          justify-between
          text-sm
          text-gray-500
          dark:text-gray-400
        ">

          <span>
            {progress}/{goal}
          </span>

          {completed && (

            <span className="
              font-medium
              text-green-600
              dark:text-green-400
            ">
              Completa
            </span>

          )}

        </div>

      </div>

    </div>
  );
}