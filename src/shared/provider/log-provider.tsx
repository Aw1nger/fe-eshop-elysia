"use client";

import { envOptions } from "@/shared/lib/env";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";

export default function LogProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data } = useQuery(
    envOptions(
      ["APP_ENV"],
      z.object({
        APP_ENV: z.enum(["development", "test", "production"]),
      }),
    ),
  );

  useEffect(() => {
    if (data?.APP_ENV === "production") {
      console.log = function () {};
      console.warn = function () {};
    }
  }, [data?.APP_ENV]);

  return <>{children}</>;
}
