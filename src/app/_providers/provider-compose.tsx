import { ComposeChildren } from "@/shared/lib/helpers";
import { AuthProvider } from "@/shared/provider/auth-provider";
import LogProvider from "@/shared/provider/log-provider";
import { QueryProvider } from "@/shared/provider/query-provider";
import { ThemeProvider } from "@/shared/provider/theme-provider";
import React from "react";

export const ProviderCompose = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ComposeChildren>
      <QueryProvider />
      <LogProvider />
      <ThemeProvider />
      <AuthProvider />
      {/* <TranslateProvider /> */}
      {children}
    </ComposeChildren>
  );
};
