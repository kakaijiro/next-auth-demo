"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/validation/schema";

export const loginWithCredential = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginValidation = loginFormSchema.safeParse({
    email,
    password,
  });

  // if failed
  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error?.issues[0]?.message ?? "An error occurred",
    };
  }

  // if succeeded
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (e) {}
};
