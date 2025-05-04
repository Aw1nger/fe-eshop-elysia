"use client";

import { UserSchema } from "@/entities/user/model/user.schema";
import { GetPayload } from "@/shared/lib/jwt";
import {
  keepPreviousData,
  QueryObserverResult,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { z } from "zod";

interface AuthContextInterface {
  user: z.infer<typeof UserSchema>;
  isLoading: boolean;
  refetchSession: () => Promise<
    QueryObserverResult<z.infer<typeof UserSchema>>
  >;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within AuthProvider");
  }
  return context;
};

function sessionOption() {
  return queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
      return await GetPayload();
    },
    placeholderData: keepPreviousData,
    initialData: null,
    refetchInterval: 1000 * 60 * 4,
  });
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch: refetchSession,
  } = useQuery(sessionOption());
  return (
    <AuthContext.Provider value={{ user, isLoading, refetchSession }}>
      {children}
    </AuthContext.Provider>
  );
};
