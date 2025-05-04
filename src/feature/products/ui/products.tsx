"use client";

import { ProductCard } from "@/entities/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { GetInfinityProductsOption } from "../api/products.api";

export const Products = () => {
  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery(GetInfinityProductsOption);
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

  return (
    <>
      {data?.map((product) => <ProductCard key={product.id} {...product} />)}
      {hasNextPage && <div ref={observerRef} />}
      {isPending ||
        (isFetchingNextPage && <div className="text-center">Загрузка...</div>)}
    </>
  );
};
