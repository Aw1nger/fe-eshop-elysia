"use client";
import { useRegister } from "../model/register.store";
import { EmailForm } from "./email-form";
import { UserForm } from "./user-form";

export const Register = () => {
  const { email } = useRegister();
  console.log(email);

  if (email) {
    return <EmailForm />;
  }

  return <UserForm />;
};
