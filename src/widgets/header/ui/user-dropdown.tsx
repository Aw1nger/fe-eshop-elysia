"use client";
import { CreateProducts } from "@/feature/create-products";
import { apiHandler } from "@/shared/action/api-handler";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Logout } from "@/shared/lib/logout";
import { MessageSchema } from "@/shared/model/message-schema";
import { useAuth } from "@/shared/provider/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { BadgeCheck, LogOut, TicketPlus, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export const UserDropdown = () => {
  const pathname = usePathname();
  const { user, refetchSession } = useAuth();
  const { push } = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () =>
      apiHandler<z.infer<typeof MessageSchema>>(
        () => Logout(window.location.hostname.split(".").slice(-2).join(".")),
        MessageSchema,
      ),
    onSuccess: (data) => {
      refetchSession();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="profile-dropdown-btn"
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {pathname === `/user/${user?.username}` ? (
            <User className="fill-primary stroke-primary size-6" />
          ) : (
            <User className="size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.avatar ?? ""} alt={user?.username} />
              <AvatarFallback className="rounded-lg">
                {user?.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold capitalize">
                {user?.username}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push("/user/" + user?.username)}>
            <BadgeCheck />
            Профиль
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CreateProducts>
              <Button variant="ghost" className="w-full justify-start px-2">
                <TicketPlus />
                Создать
              </Button>
            </CreateProducts>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem id="logout-btn" onClick={() => mutate()}>
          <LogOut />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
