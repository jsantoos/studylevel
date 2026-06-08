"use client";

import { ReactNode } from "react";

import {
  Sidebar,
} from "@/components/layout/sidebar";

import {
  useSidebarStore,
} from "@/stores/sidebar-store";

interface Props {
  children: ReactNode;
}

export function AppShell({
  children,
}: Props) {

  const {
    collapsed,
  } = useSidebarStore();

  return (

    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-white
        transition-colors
        duration-500

        dark:bg-slate-950
      "
    >

      <Sidebar />

      <main
        className={`
          min-h-screen
          transition-all
          duration-500
          ease-in-out

          pt-24
          px-4

          lg:pt-10
          lg:px-10

          ${
            collapsed
              ? "lg:ml-20"
              : "lg:ml-72"
          }
        `}
      >

        <div
          className="
            mx-auto
            w-full
            max-w-7xl
          "
        >

          {children}

        </div>

      </main>

    </div>
  );
}