"use client";

import { apiHandler } from "@/shared/action/api-handler";
import { postAction } from "@/shared/action/post-action";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { GetInfinityCartOption } from "../api/cart.api";
import { SumOptions } from "../api/sum.api";
import { CartProduct } from "./cart-product";

const PaymentSchema = z.object({ paymentLink: z.string().url() });

export const Cart = () => {
  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery(GetInfinityCartOption);
  const { data: sum } = useQuery(SumOptions);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isPending || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      {
        threshold: 0.1,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef, data, isPending, isFetchingNextPage, isFetchingNextPage]);

  const { mutate: buy, isPending: buying } = useMutation({
    mutationFn: async () =>
      await apiHandler<z.infer<typeof PaymentSchema>>(
        () => postAction("/order/create-order"),
        PaymentSchema,
      ),
    onSuccess: (data) => {
      window.location.href = data.paymentLink;
    },
    onError: () => {
      toast.error("Что-то пошло не так!", {
        description: "Технические шоколадки, попробуйте позже",
      });
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-1">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>
        {data?.map((product) => <CartProduct key={product.id} {...product} />)}
        {hasNextPage && <div ref={observerRef} />}
        {isPending ||
          (isFetchingNextPage && (
            <div className="text-center">Загрузка...</div>
          ))}
        <SheetFooter>
          <p>
            Итого: <span className="font-bold">{sum}₽</span>
          </p>
          <Button onClick={() => buy()} disabled={buying || data?.length === 0}>
            <ShoppingCart />
            Купить
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
