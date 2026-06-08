"use client";

import Link from "next/link";

import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  Settings,
  Trophy,
  X,
} from "lucide-react";

import {
  useEffect,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  useSidebarStore,
} from "@/stores/sidebar-store";

import {
  useSidebarStats,
} from "@/hooks/queries/use-sidebar-stats";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/questions",
    label: "Questões",
    icon: BookOpen,
  },

  {
    href: "/mock-exams",
    label: "Simulados",
    icon: BrainCircuit,
  },

  {
    href: "/ranking",
    label: "Ranking",
    icon: Trophy,
  },

  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },

  {
    href: "/settings",
    label: "Configurações",
    icon: Settings,
  },
];

export function Sidebar() {

  const pathname =
    usePathname();

  const {
    collapsed,
    mobileOpen,
    toggleCollapsed,
    toggleMobile,
    closeMobile,
  } = useSidebarStore();

  const {
    data: sidebarStats,
  } = useSidebarStats();

  useEffect(() => {

    closeMobile();

  }, [pathname, closeMobile]);

  return (
    <>
      {/* MOBILE HEADER */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-30
          flex
          h-16
          items-center
          justify-between
          border-b
          bg-white
          border-gray-200
          dark:bg-[#030712]
          dark:border-white/10
          px-4
          lg:hidden
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              via-violet-500
              to-fuchsia-500
              font-black
              text-slate-900
              dark:text-white
            "
          >

            AI

          </div>

          <span
            className="
              text-lg
              font-black
              text-slate-900
              dark:text-white
            "
          >

            StudyLevel

          </span>

        </div>

        <button
          onClick={toggleMobile}

          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-2
            text-slate-900
            dark:text-white
            transition
            border-gray-200
            bg-gray-100
            text-slate-700
            hover:bg-gray-200
            dark:border-white/10
            dark:bg-white/[0.03]
            dark:text-white
            dark:hover:bg-white/[0.06]
          "
        >

          <Menu size={20} />

        </button>

      </header>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (

        <div
          onClick={closeMobile}

          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-sm

            lg:hidden
          "
        />

      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col
          border-r
          border-gray-200
          bg-white

          dark:border-white/10
          dark:bg-[#030712]

          ${
            collapsed
              ? "w-20"
              : "w-72"
          }

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* HEADER */}

        <div
          className={`
            relative
            flex
            h-20
            items-center
            border-b
            border-gray-200
            dark:border-white/10

            ${
              collapsed
                ? "justify-center px-2"
                : "justify-between px-6"
            }
          `}
        >

          {/* BRAND */}

          <div
            className={`
              flex
              items-center

              ${
                collapsed
                  ? ""
                  : "gap-3"
              }
            `}
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                via-violet-500
                to-fuchsia-500
                text-xl
                font-black
                text-slate-900
                dark:text-white
                shadow-xl
              "
            >

              AI

            </div>

            {!collapsed && (

              <div>

                <div
                  className="
                    text-xl
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >

                  StudyLevel

                </div>

                <div
                  className="
                    text-xs
                    text-slate-500
                    dark:text-gray-400
                  "
                >

                  Plataforma Inteligente

                </div>

              </div>

            )}

          </div>

          {/* COLLAPSE */}

          {!collapsed && (

            <button
              onClick={toggleCollapsed}

              className="
                hidden
                rounded-xl
                border
                border-gray-200
                bg-gray-100
                text-slate-700
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                p-2
                text-slate-900
                dark:text-white
                transition
                border-gray-200
                bg-gray-100
                text-slate-700
                hover:bg-gray-200

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-white/[0.06]
                lg:flex
              "
            >

              <ChevronLeft
                size={16}
              />

            </button>

          )}

          {/* EXPAND */}

          {collapsed && (

            <button
              onClick={toggleCollapsed}

              className="
                absolute
                -right-3
                top-1/2
                z-50
                hidden
                -translate-y-1/2
                rounded-full
                border
                border-white/10
                bg-slate-900
                p-2
                text-slate-900
                dark:text-white
                shadow-xl
                transition
                bg-white
                text-slate-700
                border-gray-200
                hover:bg-gray-100
                dark:bg-slate-900
                dark:text-white
                dark:border-white/10
                dark:hover:bg-slate-800
                lg:flex
              "
            >

              <ChevronLeft
                size={14}
                className="
                  rotate-180
                "
              />

            </button>

          )}

          {/* MOBILE CLOSE */}

          <button
            onClick={closeMobile}

            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-2
              text-slate-900
              dark:text-white
              lg:hidden
            "
          >

            <X size={16} />

          </button>

        </div>

        {/* NAVIGATION */}

        <nav
          className={`
            mt-6
            flex
            flex-1
            flex-col
            gap-3

            ${
              collapsed
                ? "items-center px-2"
                : "px-4"
            }
          `}
        >

          {links.map((link) => {

            const Icon =
              link.icon;

            const active =
              pathname.startsWith(
                link.href,
              );

            return (

              <Link
                key={link.href}
                href={link.href}

                onClick={() => {

                  closeMobile();
                }}

                className={`
                  flex
                  shrink-0
                  items-center
                  rounded-2xl
                  transition-all
                  duration-200

                  ${
                    collapsed
                      ? `
                        h-14
                        w-14
                        justify-center
                      `
                      : `
                        w-full
                        gap-3
                        px-4
                        py-4
                      `
                  }

                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-indigo-500
                        via-violet-500
                        to-fuchsia-500
                        text-slate-900
                        dark:text-white
                        shadow-xl
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-gray-300
                        dark:hover:bg-white/[0.05]
                        dark:hover:text-white
                      `
                  }
                `}
              >

                <Icon
                  size={20}
                  className="
                    shrink-0
                  "
                />

                {!collapsed && (

                  <span
                    className="
                      text-sm
                      font-semibold
                    "
                  >

                    {link.label}

                  </span>

                )}

              </Link>

            );
          })}

        </nav>
        {/* BOTTOM CARD */}

        {!collapsed && (

        <div
          className="
            border-t
            border-gray-100
            p-5

            dark:border-white/10
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-gray-200
              bg-gradient-to-br
              from-white
              via-slate-50
              to-indigo-50
              p-5
              shadow-xl
              transition-all
              duration-500

              dark:border-white/10
              dark:from-[#0f172a]
              dark:via-[#111827]
              dark:to-black
            "
          >

            <div
              className="
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-indigo-500/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-200
                  bg-indigo-500/[0.08]
                  px-3
                  py-1
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-indigo-700

                  dark:border-white/10
                  dark:text-indigo-200
                "
              >

                🚀 Continue Evoluindo

              </div>

              <div className="mt-5 flex items-center gap-4">

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
                    text-2xl
                    text-slate-900
                    dark:text-white
                    shadow-xl
                  "
                >

                  🧠

                </div>

                <div>

                  <h3
                    className="
                      text-[28px]
                      font-black
                      leading-tight
                      tracking-tight
                      text-slate-900

                      dark:text-white
                    "
                  >

                    Study Smarter

                  </h3>

                  <p
                    className="
                      mt-1
                      text-[13px]
                      text-slate-600

                      dark:text-gray-400
                    "
                  >

                    Evolua diariamente com IA.

                  </p>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">

                <div
                  className="
                    rounded-2xl
                    bg-black/[0.02]
                    p-3

                    dark:bg-white/[0.04]
                  "
                >

                  <div
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500

                      dark:text-gray-400
                    "
                  >

                    Streak

                  </div>

                  <div
                    className="
                      mt-1
                      text-lg
                      font-black
                      text-emerald-500
                    "
                  >

                  {sidebarStats?.streak_days ?? 0} dias

                  </div>

                </div>

                <div
                  className="
                    rounded-2xl
                    bg-black/[0.02]
                    p-3

                    dark:bg-white/[0.04]
                  "
                >

                  <div
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500

                      dark:text-gray-400
                    "
                  >

                    XP Hoje

                  </div>

                  <div
                    className="
                      mt-1
                      text-lg
                      font-black
                      text-amber-500
                    "
                  >

                  +{sidebarStats?.today_xp ?? 0} XP

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        )}

      </aside>
    </>
  );
}