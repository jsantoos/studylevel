"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  Brain,
  Flame,
  LogOut,
  MoonStar,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";

import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";

import { Topbar } from "@/components/layout/topbar";

import {
  getPreferences,
  updatePreferences,
} from "@/services/user/preferences.service";

import { UserPreferences } from "@/types/user";



export default function SettingsPage() {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [preferences, setPreferences] =
    useState<UserPreferences>({
      study_goal_minutes: 30,
      favorite_subjects: [],
      preferred_difficulty: "medium",
      focus_mode_enabled: false,
      notifications_enabled: true,
      theme: "light",
    });

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getPreferences();

        setPreferences(
          data,
        );

      } finally {

        setLoading(false);
      }
    }

    load();

  }, []);

  async function handleSave() {

    try {

      setSaving(true);

      await updatePreferences(
        preferences,
      );

      toast.success(
        "Preferências salvas com sucesso.",
      );

    } finally {

      setSaving(false);
    }
  }

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white

          dark:bg-[#020617]
        "
      >

        <div className="text-center">

          <div
            className="
              mx-auto
              mb-5
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
              border-indigo-500/20
              border-t-indigo-500
            "
          />

          <div
            className="
              text-lg
              font-bold
              text-gray-900

              dark:text-white
            "
          >

            Carregando configurações...

          </div>

        </div>

      </div>
    );
  }

  return (

    <AppShell>

      <Topbar
        title="Configurações"
        description="Gerencie sua experiência de aprendizado inteligente."
      />

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        <div
          className="
            grid
            gap-8

            xl:grid-cols-[360px_1fr]
          "
        >

          <div className="space-y-8">

            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-gray-200
                bg-white
                p-8
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
                  right-0
                  top-0
                  h-40
                  w-40
                  rounded-full
                  bg-indigo-500/10
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="flex items-center gap-5">

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
                      text-4xl
                      font-black
                      text-white
                      shadow-2xl
                    "
                  >

                    L

                  </div>

                  <div>

                    <div
                      className="
                        text-2xl
                        font-black
                        text-gray-900

                        dark:text-white
                      "
                    >

                      João Santos

                    </div>

                    <div
                      className="
                        mt-1
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      StudyLevel Premium

                    </div>

                  </div>

                </div>

                <div
                  className="
                    mt-8
                    grid
                    grid-cols-2
                    gap-4
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-indigo-200
                      bg-indigo-50
                      p-5

                      dark:border-indigo-500/10
                      dark:bg-indigo-500/10
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-indigo-600

                        dark:text-indigo-300
                      "
                    >

                      <Flame className="h-4 w-4" />

                      <span className="text-sm font-semibold">
                        Meta
                      </span>

                    </div>

                    <div
                      className="
                        mt-3
                        text-3xl
                        font-black
                        text-indigo-700

                        dark:text-indigo-200
                      "
                    >

                      {preferences.study_goal_minutes}m

                    </div>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-fuchsia-200
                      bg-fuchsia-50
                      p-5

                      dark:border-fuchsia-500/10
                      dark:bg-fuchsia-500/10
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-fuchsia-600

                        dark:text-fuchsia-300
                      "
                    >

                      <Brain className="h-4 w-4" />

                      <span className="text-sm font-semibold">
                        Modo
                      </span>

                    </div>

                    <div
                      className="
                        mt-3
                        text-lg
                        font-black
                        text-fuchsia-700

                        dark:text-fuchsia-200
                      "
                    >

                      AI Learning

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div
              className="
                rounded-[32px]
                border
                border-red-200
                bg-gradient-to-br
                from-red-50
                to-white
                p-8
                shadow-xl

                dark:border-red-500/10
                dark:from-red-500/10
                dark:to-slate-950
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-500
                    text-white
                    shadow-lg
                  "
                >

                  <Shield className="h-6 w-6" />

                </div>

                <div className="flex-1">

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-red-600

                      dark:text-red-300
                    "
                  >

                    Conta & Sessão

                  </h2>

                  <p
                    className="
                      mt-3
                      leading-7
                      text-red-500

                      dark:text-red-200/70
                    "
                  >

                    Gerencie autenticação,
                    privacidade e dispositivos
                    conectados.

                  </p>

                  <button
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-red-500
                      px-5
                      py-3
                      font-bold
                      text-white
                      shadow-xl
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:bg-red-600
                    "
                  >

                    <LogOut className="h-5 w-5" />

                    Logout

                  </button>

                </div>

              </div>

            </div>

          </div>

          <div>

            <div
              className="
                relative
                overflow-hidden
                rounded-[36px]
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
                  h-72
                  w-72
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
                  h-72
                  w-72
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
                    items-start
                    justify-between
                    gap-6
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

                      Personalização Inteligente

                    </div>

                    <h2
                      className="
                        mt-6
                        text-4xl
                        font-black
                        tracking-tight
                        text-gray-900

                        dark:text-white
                      "
                    >

                      Preferências
                      de Estudo

                    </h2>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-lg
                        leading-8
                        text-gray-500

                        dark:text-gray-400
                      "
                    >

                      Configure sua experiência
                      para focar no que realmente
                      acelera sua evolução.

                    </p>

                  </div>

                </div>

                <div className="space-y-8">

                  <div
                    className="
                      grid
                      gap-8

                      lg:grid-cols-2
                    "
                  >

                    <div>

                      <label
                        className="
                          mb-4
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          uppercase
                          tracking-wider
                          text-gray-700

                          dark:text-gray-300
                        "
                      >

                        <Target className="h-4 w-4" />

                        Meta diária

                      </label>

                      <input
                        type="number"

                        value={
                          preferences.study_goal_minutes
                        }

                        onChange={(event) =>
                          setPreferences({
                            ...preferences,

                            study_goal_minutes:
                              Number(
                                event.target.value,
                              ),
                          })
                        }

                        className="
                          h-16
                          w-full
                          rounded-2xl
                          border
                          border-gray-200
                          bg-gray-50
                          px-5
                          text-lg
                          font-bold
                          text-gray-900
                          outline-none
                          transition-all
                          duration-300
                          focus:border-indigo-400
                          focus:ring-4
                          focus:ring-indigo-500/20

                          dark:border-white/10
                          dark:bg-slate-950/80
                          dark:text-white
                        "
                      />

                    </div>

                    <div>

                      <label
                        className="
                          mb-4
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          uppercase
                          tracking-wider
                          text-gray-700

                          dark:text-gray-300
                        "
                      >

                        <Brain className="h-4 w-4" />

                        Dificuldade

                      </label>

                      <select
                        value={
                          preferences.preferred_difficulty
                        }

                        onChange={(event) =>
                          setPreferences({
                            ...preferences,

                            preferred_difficulty:
                              event.target.value,
                          })
                        }

                        className="
                          h-16
                          w-full
                          rounded-2xl
                          border
                          border-gray-200
                          bg-gray-50
                          px-5
                          text-lg
                          font-bold
                          text-gray-900
                          outline-none
                          transition-all
                          duration-300
                          focus:border-indigo-400
                          focus:ring-4
                          focus:ring-indigo-500/20

                          dark:border-white/10
                          dark:bg-slate-950/80
                          dark:text-white
                        "
                      >

                        <option value="easy">
                          Fácil
                        </option>

                        <option value="medium">
                          Médio
                        </option>

                        <option value="hard">
                          Difícil
                        </option>

                      </select>

                    </div>

                  </div>

                  <div
                    className="
                      grid
                      gap-6

                      md:grid-cols-2
                    "
                  >

                    <div
                      className="
                        rounded-3xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-7
                        transition-all
                        duration-300

                        dark:border-white/10
                        dark:bg-slate-950/60
                      "
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-lg
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >

                            <MoonStar className="h-5 w-5 text-indigo-500" />

                            Focus Mode

                          </div>

                          <p
                            className="
                              mt-3
                              leading-7
                              text-gray-500

                              dark:text-gray-400
                            "
                          >

                            Minimiza distrações
                            para manter máxima
                            concentração.

                          </p>

                        </div>

                        <input
                          type="checkbox"

                          checked={
                            preferences.focus_mode_enabled
                          }

                          onChange={(event) =>
                            setPreferences({
                              ...preferences,

                              focus_mode_enabled:
                                event.target.checked,
                            })
                          }

                          className="
                            h-5
                            w-5
                            accent-indigo-500
                          "
                        />

                      </div>

                    </div>

                    <div
                      className="
                        rounded-3xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-7
                        transition-all
                        duration-300

                        dark:border-white/10
                        dark:bg-slate-950/60
                      "
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-lg
                              font-black
                              text-gray-900

                              dark:text-white
                            "
                          >

                            <Bell className="h-5 w-5 text-fuchsia-500" />

                            Notificações

                          </div>

                          <p
                            className="
                              mt-3
                              leading-7
                              text-gray-500

                              dark:text-gray-400
                            "
                          >

                            Receba lembretes e
                            alertas inteligentes
                            de progresso.

                          </p>

                        </div>

                        <input
                          type="checkbox"

                          checked={
                            preferences.notifications_enabled
                          }

                          onChange={(event) =>
                            setPreferences({
                              ...preferences,

                              notifications_enabled:
                                event.target.checked,
                            })
                          }

                          className="
                            h-5
                            w-5
                            accent-fuchsia-500
                          "
                        />

                      </div>

                    </div>

                  </div>

                  <div>

                    <label
                      className="
                        mb-4
                        block
                        text-sm
                        font-bold
                        uppercase
                        tracking-wider
                        text-gray-700

                        dark:text-gray-300
                      "
                    >

                      Tema da plataforma

                    </label>

                    <select
                      value={
                        preferences.theme
                      }

                      onChange={(event) =>
                        setPreferences({
                          ...preferences,

                          theme:
                            event.target.value,
                        })
                      }

                      className="
                        h-16
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-5
                        text-lg
                        font-bold
                        text-gray-900
                        outline-none
                        transition-all
                        duration-300
                        focus:border-indigo-400
                        focus:ring-4
                        focus:ring-indigo-500/20

                        dark:border-white/10
                        dark:bg-slate-950/80
                        dark:text-white
                      "
                    >

                      <option value="light">
                        Light Premium
                      </option>

                      <option value="dark">
                        Dark AI
                      </option>

                      <option value="focus">
                        Focus Mode
                      </option>

                    </select>

                  </div>

                  <button
                    onClick={handleSave}

                    disabled={saving}

                    className="
                      relative
                      mt-4
                      flex
                      h-16
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-3xl
                      bg-gradient-to-r
                      from-indigo-500
                      via-violet-500
                      to-fuchsia-500
                      text-lg
                      font-black
                      text-white
                      shadow-2xl
                      transition-all
                      duration-300
                      hover:scale-[1.01]
                      disabled:opacity-50
                    "
                  >

                    <div
                      className="
                        absolute
                        inset-0
                        bg-white/10
                        opacity-0
                        transition-opacity
                        duration-300
                        hover:opacity-100
                      "
                    />

                    <span className="relative z-10">

                      {saving
                        ? "Salvando..."
                        : "Salvar Preferências"}

                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AppShell>

  );
}