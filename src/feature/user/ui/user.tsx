"use client";

import { GetUserOptions } from "@/entities/user/api/user.api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const User = ({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) => {
  const { data: user } = useQuery(GetUserOptions(username));

  return (
    <section className="container mx-auto mt-4 px-2">
      <div className="sm:my-4">
        <div className="flex gap-4 px-2 sm:px-0">
          <Avatar className="aspect-square h-16 w-16 sm:h-20 sm:w-20 md:h-40 md:w-40">
            <AvatarImage src={user?.avatar ?? ""} />
            <AvatarFallback className="font-bold uppercase md:text-4xl">
              {username[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-1 md:my-2 md:gap-2">
            <h1 className="line-clamp-1 text-xl font-bold capitalize sm:text-2xl md:text-4xl">
              {username}
            </h1>
            <div className="text-sm text-gray-500">
              <span className="text-foreground font-bold">@{username}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
