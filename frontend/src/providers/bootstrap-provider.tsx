"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AppBootstrapLoader,
} from "@/components/ui/app-bootstrap-loader";

export function BootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 650);

    return () =>
      clearTimeout(timer);

  }, []);

  if (loading) {

    return (
      <AppBootstrapLoader />
    );
  }

  return <>{children}</>;
}