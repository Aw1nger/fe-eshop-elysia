import { apiHandler } from "@/shared/action/api-handler";
import { postAction } from "@/shared/action/post-action";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { SetJwtTokens } from "@/shared/lib/set-tokens";
import { cn } from "@/shared/lib/utils";
import { JwtMessageSchema } from "@/shared/model/jwt-message-schema";
import { useAuth } from "@/shared/provider/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CodeSchema } from "../model/ code.schema";
import { useRegister } from "../model/register.store";

export const EmailForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { refetchSession } = useAuth();
  const { email } = useRegister();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(CodeSchema),
    defaultValues: { email: email ?? "", code: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CodeSchema>) =>
      apiHandler<z.infer<typeof JwtMessageSchema>>(
        () => postAction("/auth/verify-email", data),
        JwtMessageSchema,
      ),
    onSuccess: async (data) => {
      await SetJwtTokens(data.accessToken, data.refreshToken);
      await refetchSession();
      toast.success("Вы успешно зарегестрировались!");
      push("/");
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-bold">Еще чуть-чуть!</h1>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Код</FormLabel>
                    <div className="flex justify-center">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                Войти
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Нажимая продолжить, вы соглашаеьесяь с{" "}
        <a href="#">Пользовательским соглашением</a> и{" "}
        <a href="#">Политикой конфеденциальности</a>.
      </div>
    </div>
  );
};
