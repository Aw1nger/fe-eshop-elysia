"use client";
import { useLogin } from "../model/login.store";
import { CodeForm } from "./code-form";
import { EmailForm } from "./email-form";

export const Login = () => {
  const { email } = useLogin();

  if (email) {
    return <CodeForm />;
  }

  return <EmailForm />;
};
