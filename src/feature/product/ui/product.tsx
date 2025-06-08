"use client";
import { apiHandler } from "@/shared/action/api-handler";
import { deleteAction } from "@/shared/action/delete-action";
import { postAction } from "@/shared/action/post-action";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/provider/auth-provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { GetProductOption } from "../api/product.api";

export const Product = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery(GetProductOption(id));

  const { mutate: addCart, isPending: addingCart } = useMutation({
    mutationFn: async () =>
      await apiHandler(() => postAction(`/cart/${id}`), z.string()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так!", {
        description: "Технические шоколадки, попробуйте позже",
      });
    },
  });

  const { mutate: deleteCart, isPending: deletingCart } = useMutation({
    mutationFn: async () =>
      await apiHandler(() => deleteAction(`/cart/${id}`), z.object({})),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так!", {
        description: "Технические шоколадки, попробуйте позже",
      });
    },
  });

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (isPending) {
    return <div className="text-center">Загрузка... </div>;
  }

  return (
    <section className="container mx-auto my-6 grid grid-cols-1 gap-4 px-2 sm:grid-cols-3">
      <div className="sm:col-span-1">
        {data.images[0] ? (
          <div className="bg-muted/60 rounded-lg">
            <picture className="aspect-square overflow-hidden">
              {data.images[0].versions.map((image, index) => (
                <source
                  key={index}
                  srcSet={image.link}
                  type={`image/${image.format}`}
                />
              ))}
              <img
                className="aspect-square h-full w-full rounded-lg object-contain"
                src={data.images[0].versions[0].link}
                alt=""
              />
            </picture>
          </div>
        ) : (
          <div className="bg-muted flex aspect-square items-center justify-center rounded-lg">
            <Image />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between sm:col-span-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
          <h2 className="text-xl font-extrabold">{data.price}₽</h2>
          {data.description.split("\n").map((string, index) => (
            <p className="text-lg" key={index}>{string}</p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Button className="capitalize" variant="link" asChild>
              <Link href={"/user/" + data.user.username}>
                <Avatar className="size-6">
                  <AvatarImage
                    src={data.user.avatar ?? undefined}
                    alt={data.user.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {data.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {data.user.username}
              </Link>
            </Button>
            <p className="text-sm text-gray-500">| В наличии: {data.count}</p>
          </div>

          {user ? (
            data.cartCount ? (
              <Button
                onClick={() => deleteCart()}
                disabled={deletingCart}
                variant="destructive"
              >
                <Trash /> Удалить из корзины
              </Button>
            ) : (
              <Button onClick={() => addCart()} disabled={addingCart}>
                В корзину
              </Button>
            )
          ) : (
            <Button
              onClick={() => {
                toast.warning("Войдите что бы добавить в корзину!");
                push("/login");
              }}
            >
              В корзину
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
