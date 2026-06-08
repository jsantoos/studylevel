"use client";

import {
  Bell,
  Flame,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

import {
  ThemeToggle,
} from "@/components/theme-toggle";

import {
  useUserProgress,
} from "@/hooks/queries/use-user-progress";

interface Props {

  title: string;

  description?: string;
}

export function Topbar({
  title,
  description,
}: Props) {

  const {
    data: progress,
  } = useUserProgress();

  return (

    <div className="mb-10">

      <div
        className="
          flex
          flex-col
          gap-6
          rounded-[32px]
          border
          border-gray-200
          bg-white/80
          px-5
          py-5
          shadow-xl
          backdrop-blur-2xl
          transition-all
          duration-500

          dark:border-white/10
          dark:bg-slate-900/60

          xl:flex-row
          xl:items-center
          xl:justify-between
          xl:px-8
          xl:py-6
        "
      >

        {/* LEFT */}

        <div className="min-w-0">

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-gray-900

              dark:text-white

              xl:text-4xl
            "
          >

            {title}

          </h1>

          {description && (

            <p
              className="
                mt-2
                max-w-xl
                text-gray-500

                dark:text-gray-400
              "
            >

              {description}

            </p>

          )}

        </div>

        {/* SEARCH */}

        <div
          className="
            hidden
            flex-1
            justify-center

            2xl:flex
          "
        >

          <div
            className="
              flex
              w-full
              max-w-xl
              items-center
              gap-3
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-5
              py-4
              shadow-inner
              transition-all
              duration-300
              focus-within:border-indigo-400

              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >

            <Search
              className="
                h-5
                w-5
                text-gray-400
              "
            />

            <input
              type="text"

              placeholder="
                Buscar questões,
                tópicos ou simulados...
              "

              className="
                w-full
                bg-transparent
                text-sm
                text-gray-900
                outline-none
                placeholder:text-gray-400

                dark:text-white
                dark:placeholder:text-gray-500
              "
            />

          </div>

        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            w-full
            flex-wrap
            items-center
            justify-between
            gap-3

            sm:justify-start

            xl:w-auto
            xl:flex-nowrap
          "
        >

          {/* ENERGY */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-orange-200
              bg-orange-50
              px-5
              py-3
              shadow-sm

              lg:flex

              dark:border-orange-400/10
              dark:bg-orange-400/10
            "
          >

            <Flame
              className="
                h-5
                w-5
                text-orange-500
              "
            />

            <div>

              <div
                className="
                  text-xs
                  text-orange-500

                  dark:text-orange-200/70
                "
              >

                Enegia

              </div>

              <div
                className="
                  font-bold
                  text-gray-900

                  dark:text-white
                "
              >

                {progress?.energy ?? 0} %

              </div>

            </div>

          </div>

          {/* XP */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-yellow-200
              bg-yellow-50
              px-5
              py-3
              shadow-sm

              lg:flex

              dark:border-yellow-400/10
              dark:bg-yellow-400/10
            "
          >

            <Star
              className="
                h-5
                w-5
                text-yellow-500

                dark:text-yellow-300
              "
            />

            <div>

              <div
                className="
                  text-xs
                  text-yellow-600

                  dark:text-yellow-100/70
                "
              >

                XP

              </div>

              <div
                className="
                  font-bold
                  text-gray-900

                  dark:text-white
                "
              >

                {progress?.xp ?? 0} XP

              </div>

            </div>

          </div>

          {/* THEME */}

          <ThemeToggle />

          {/* NOTIFICATION */}

          <button
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-200
              bg-white
              text-gray-700
              shadow-sm
              transition-all
              duration-300
              hover:scale-105
              hover:bg-gray-100

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-white
              dark:hover:bg-white/10

              xl:h-14
              xl:w-14
            "
          >

            <Bell className="h-5 w-5" />

          </button>

          {/* AI */}

          <button
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              via-violet-500
              to-fuchsia-500
              text-white
              shadow-2xl
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-fuchsia-500/20

              xl:h-14
              xl:w-14
            "
          >

            <Sparkles className="h-5 w-5" />

          </button>

        </div>

      </div>

    </div>
  );
}