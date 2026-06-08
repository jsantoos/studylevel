"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

type SidebarStore = {
  collapsed: boolean;
  mobileOpen: boolean;

  toggleCollapsed: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
};

export const useSidebarStore =
  create<SidebarStore>()(
    persist(
      (set) => ({
        collapsed: false,

        mobileOpen: false,

        toggleCollapsed: () =>
          set((state) => ({
            collapsed:
              !state.collapsed,
          })),

        toggleMobile: () =>
          set((state) => ({
            mobileOpen:
              !state.mobileOpen,
          })),

        closeMobile: () =>
          set({
            mobileOpen: false,
          }),
      }),

      {
        name:
          "studylevel-sidebar",
      },
    ),
  );