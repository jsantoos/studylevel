import type {
  AnsweredQuestion,
} from "@/types/mock-exam";

interface Props {
  totalQuestions: number;

  currentIndex: number;

  answeredQuestions: AnsweredQuestion[];

  onSelectQuestion: (
    index: number,
  ) => void;
}

export function MockQuestionNavigator({
  totalQuestions,
  currentIndex,
  answeredQuestions,
  onSelectQuestion,
}: Props) {

  return (

    <div className="space-y-5">

      <div>

        <h3
          className="
            text-xl
            font-black
            text-gray-900
            dark:text-white
          "
        >

          Questões

        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-gray-500
            dark:text-gray-400
          "
        >

          Navegue rapidamente entre
          as questões do simulado.

        </p>

      </div>

      <div className="grid grid-cols-4 gap-3">

        {Array.from({
          length: totalQuestions,
        }).map((_, index) => {

          const answered =
            answeredQuestions.find(
              (q) => q.index === index,
            );

          const current =
            currentIndex === index;

          return (

            <button
              key={index}

              onClick={() =>
                onSelectQuestion(
                  index,
                )
              }

              className={`
                relative
                flex
                h-14
                items-center
                justify-center
                rounded-2xl
                border
                text-sm
                font-black
                transition-all
                duration-300
                hover:scale-[1.03]

                ${
                  current

                    ? `
                      border-indigo-400/40
                      bg-gradient-to-br
                      from-indigo-500
                      via-violet-500
                      to-fuchsia-500
                      text-white
                      shadow-2xl
                    `

                    : answered?.correct

                    ? `
                      border-emerald-300
                      bg-emerald-100
                      text-emerald-700

                      dark:border-emerald-500/20
                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    `

                    : answered &&
                      !answered.correct

                    ? `
                      border-red-300
                      bg-red-100
                      text-red-700

                      dark:border-red-500/20
                      dark:bg-red-500/10
                      dark:text-red-400
                    `

                    : `
                      border-gray-200
                      bg-gray-50
                      text-gray-700

                      dark:border-white/10
                      dark:bg-slate-950
                      dark:text-gray-300
                    `
                }
              `}
            >

              {answered && !current && (

                <div
                  className={`
                    absolute
                    right-2
                    top-2
                    h-2
                    w-2
                    rounded-full

                    ${
                      answered?.correct
                    
                        ? `
                          border-emerald-400/40
                          bg-gradient-to-br
                          from-emerald-500/20
                          to-green-500/10
                          text-emerald-300
                          shadow-lg
                        `
                    
                        : answered &&
                          !answered.correct
                    
                        ? `
                          border-red-400/40
                          bg-gradient-to-br
                          from-red-500/20
                          to-rose-500/10
                          text-red-300
                          shadow-lg
                        `
                    
                        : current
                    
                        ? `
                          border-indigo-400/40
                          bg-gradient-to-br
                          from-indigo-500
                          via-violet-500
                          to-fuchsia-500
                          text-white
                          shadow-2xl
                        `
                    
                        : `
                          border-gray-200
                          bg-gray-50
                          text-gray-700
                    
                          dark:border-white/10
                          dark:bg-slate-950
                          dark:text-gray-300
                        `
                    }
                  `}
                />

              )}

              {index + 1}

            </button>
          );
        })}

      </div>

    </div>
  );
}