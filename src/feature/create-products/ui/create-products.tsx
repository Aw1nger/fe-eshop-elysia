// feature/create-product/ui/create-product.tsx

"use client";

import { ApiError } from "@/shared/action/api-error";
import { apiHandler } from "@/shared/action/api-handler";
import { postAction } from "@/shared/action/post-action";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { MessageSchema } from "@/shared/model/message-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateProductsSchema } from "../model/create-products.schema";

const ResponseSchema = z.object({
  id: z.number(),
});

/**
 * Компонент формы создания товара
 * @param children
 * @constructor
 */
export const CreateProducts = ({ children }: { children: React.ReactNode }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(CreateProductsSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      count: 1,
      image: undefined,
    },
  });

  const { mutate: uploadData, isPending: dataPeding } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateProductsSchema>) => {
      delete data.image;
      return await apiHandler<z.infer<typeof ResponseSchema>>(
        () => postAction("/products/create", data),
        ResponseSchema,
      );
    },
    onError: (error: ApiError<keyof z.infer<typeof CreateProductsSchema>>) => {
      error.message && toast.error(error.message);
      error.details?.fields?.map((field) =>
        form.setError(field.field, { message: field.message }),
      );
    },
    onSuccess: (data) => {
      const image = form.getValues("image");
      if (image) {
        uploadPhoto({ id: data.id, image });
      } else {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        closeRef.current?.click();
        toast.success("Предложение успешно созданно!");
      }
    },
  });

  const { mutate: uploadPhoto, isPending: photoPending } = useMutation({
    mutationFn: async (data: { id: number; image: File }) => {
      const formData = new FormData();
      formData.append("image", form.getValues("image") ?? "");

      return await apiHandler<z.infer<typeof MessageSchema>>(
        () => postAction(`/products/upload-photo/${data.id}`, formData),
        MessageSchema,
      );
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeRef.current?.click();
      toast.success("Предложение успешно созданно!");
    },
    onError: () => {
      toast.error("Что-то не так, попробуйте позже!");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать предложение?</DialogTitle>
          <DialogDescription>
            Данным действием вы создадите предложение доступное к покупке другим
            пользователям
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit((data) => uploadData(data))}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Назвние..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea maxLength={1024} rows={3} placeholder="Описание..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Цена..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Колличество..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображение</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="grid sm:grid-cols-2">
              <DialogClose asChild>
                <Button ref={closeRef} type="button" variant="secondary">
                  Закрыть
                </Button>
              </DialogClose>
              <Button disabled={dataPeding || photoPending} type="submit">
                Создать
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
