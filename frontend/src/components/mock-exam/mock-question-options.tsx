"use client";

import type {
  MockExamOption,
} from "@/types/mock-exam";

interface Props {
  options: MockExamOption[];

  selectedOption: string | null;

  onSelect: (
    optionId: string,
  ) => void;
}

export function MockQuestionOptions({
  options,
  selectedOption,
  onSelect,
}: Props) {

  return (

    <div className="space-y-5">

      {options.map(
        (
          option,
          index,
        ) => {

          const selected =
            selectedOption ===
            option.id;

          return (

            <button
              key={option.id}

              onClick={() =>
                onSelect(
                  option.id,
                )
              }

              className={`
                group
                relative
                flex
                w-full
                items-start
                gap-5
                overflow-hidden
                rounded-[28px]
                border
                p-6
                text-left
                transition-all
                duration-300
                hover:scale-[1.01]

                ${
                  selected

                    ? `
                      border-indigo-500/30
                      bg-gradient-to-r
                      from-indigo-500/15
                      via-violet-500/10
                      to-fuchsia-500/15
                      shadow-2xl
                      shadow-indigo-500/10
                    `

                    : `
                      border-gray-200
                      bg-white
                      hover:border-indigo-200
                      hover:bg-gradient-to-r
                      hover:from-indigo-50
                      hover:to-fuchsia-50
                      hover:shadow-xl

                      dark:border-white/10
                      dark:bg-slate-900
                      dark:hover:border-indigo-500/20
                      dark:hover:from-slate-900
                      dark:hover:to-indigo-950/20
                    `
                }
              `}
            >

              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  text-lg
                  font-black
                  transition-all
                  duration-300

                  ${
                    selected

                      ? `
                        border-indigo-500
                        bg-gradient-to-br
                        from-indigo-500
                        to-fuchsia-500
                        text-white
                        shadow-lg
                      `

                      : `
                        border-gray-200
                        bg-gray-50
                        text-gray-600

                        dark:border-white/10
                        dark:bg-slate-800
                        dark:text-gray-300
                      `
                  }
                `}
              >

                {String.fromCharCode(
                  65 + index,
                )}

              </div>

              <div className="flex-1">

                <p
                  className={`
                    text-lg
                    font-medium
                    leading-8
                    transition-colors
                    duration-300

                    ${
                      selected

                        ? `
                          text-gray-900

                          dark:text-white
                        `

                        : `
                          text-gray-700

                          dark:text-gray-300
                        `
                    }
                  `}
                >

                  {option.option_text}

                </p>

              </div>

              <div
                className={`
                  absolute
                  right-5
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  rounded-full
                  border-2
                  transition-all
                  duration-300

                  ${
                    selected

                      ? `
                        border-indigo-500
                        bg-indigo-500
                        shadow-lg
                        shadow-indigo-500/30
                      `

                      : `
                        border-gray-300
                        bg-transparent

                        dark:border-gray-600
                      `
                  }
                `}
              />

            </button>

          );
        },
      )}

    </div>

  );
}