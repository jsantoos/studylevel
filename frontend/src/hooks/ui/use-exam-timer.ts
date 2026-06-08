"use client";

import {
  useEffect,
  useState,
} from "react";

export function useExamTimer() {
  const [seconds, setSeconds] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setSeconds(
          (prev) => prev + 1,
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  const minutes = Math.floor(
    seconds / 60,
  );

  const remainingSeconds =
    seconds % 60;

  const formatted =
    `${String(minutes).padStart(
      2,
      "0",
    )}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;

  return {
    seconds,
    formatted,
  };
}