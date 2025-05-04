"use client";

import { ProductCard } from "@/entities/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { GetInfinityUserProductsOptions } from "../api/user-products.api";

export const UserProducts = ({ username }: { username: string }) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery(GetInfinityUserProductsOptions(username));

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

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (isPending) {
    return <div className="text-center">Загрузка... </div>;
  }

  if (data.length < 1) {
    return (
      <div className="col-span-full flex h-40 items-center justify-center text-xl font-bold">
        Предложений нет!
      </div>
    );
  }

  return (
    <>
      {data?.map((product) => <ProductCard key={product.id} {...product} />)}
      {hasNextPage && <div ref={observerRef} />}
      {isFetchingNextPage && <div className="text-center">Загрузка...</div>}
    </>
  );
};
