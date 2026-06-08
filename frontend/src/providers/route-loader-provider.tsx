"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import { GlobalLoader } from "@/components/ui/global-loader";

interface ContextProps {

  loading: boolean;

  showLoader: () => void;
}

const RouteLoaderContext =
  createContext<ContextProps | null>(
    null,
  );

export function RouteLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  const [loading, setLoading] =
    useState(false);

  function showLoader() {

    setLoading(true);
  }

  useEffect(() => {

    const timeout =
      setTimeout(() => {
  
        setLoading(false);
  
      }, 0);
  
    return () =>
      clearTimeout(timeout);
  
  }, [pathname]);

  return (

    <RouteLoaderContext.Provider
      value={{
        loading,
        showLoader,
      }}
    >

      {children}

      {loading && (
        <GlobalLoader />
      )}

    </RouteLoaderContext.Provider>
  );
}

export function useRouteLoader() {

  const context =
    useContext(
      RouteLoaderContext,
    );

  if (!context) {

    throw new Error(
      "useRouteLoader must be used within RouteLoaderProvider",
    );
  }

  return context;
}