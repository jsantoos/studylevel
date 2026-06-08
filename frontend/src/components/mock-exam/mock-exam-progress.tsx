"use client";

interface Props {
  current: number;

  total: number;
}

export function MockExamProgress({
  current,
  total,
}: Props) {

  const percentage =
    (current / total) * 100;

  const completed =
    percentage === 100;

  return (

    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <div>

          <div
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-indigo-500
            "
          >

            Progresso do Simulado

          </div>

          <div
            className="
              mt-2
              text-2xl
              font-black
              text-gray-900

              dark:text-white
            "
          >

            {current}
            {" "}
            de
            {" "}
            {total}
            {" "}
            questões

          </div>

        </div>

        <div
          className={`
            rounded-2xl
            px-5
            py-3
            text-lg
            font-black
            transition-all
            duration-500

            ${
              completed

                ? `
                  border
                  border-green-500/20
                  bg-green-500/10
                  text-green-600

                  dark:text-green-300
                `

                : `
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  text-indigo-600

                  dark:text-indigo-300
                `
            }
          `}
        >

          {Math.round(
            percentage,
          )}
          %

        </div>

      </div>

      <div
        className="
          h-5
          overflow-hidden
          rounded-full
          bg-gray-100

          dark:bg-slate-800
        "
      >

        <div
          className={`
            relative
            h-full
            rounded-full
            transition-all
            duration-700

            ${
              completed

                ? `
                  bg-gradient-to-r
                  from-emerald-400
                  via-green-500
                  to-emerald-600
                `

                : `
                  bg-gradient-to-r
                  from-indigo-500
                  via-violet-500
                  to-fuchsia-500
                `
            }
          `}
          style={{
            width: `${percentage}%`,
          }}
        >

          <div
            className="
              absolute
              inset-0
              animate-pulse
              bg-white/20
            "
          />

        </div>

      </div>

      <div className="flex items-center justify-between">

        <div
          className="
            text-sm
            text-gray-500

            dark:text-gray-400
          "
        >

          Continue avançando 🚀

        </div>

        <div
          className={`
            text-sm
            font-semibold

            ${
              completed

                ? `
                  text-green-600

                  dark:text-green-400
                `

                : `
                  text-indigo-600

                  dark:text-indigo-300
                `
            }
          `}
        >

          {
            completed
              ? "Simulado concluído!"
              : "Em andamento"
          }

        </div>

      </div>

    </div>

  );
}