"use server";

import { signIn } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";
import { loginFormSchema } from "@/validation/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

export const loginWithCredential = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token?: string;
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
      token,
      redirect: false,
    });
  } catch (e) {
    return {
      error: true,
      message: "Incorrect email or password",
    };
  }
};

export const preLoginCheck = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      error: true,
      message: "Incorrect credentials",
    };
  } else {
    const passwordCorrct = await compare(password, user.password as string);
    if (!passwordCorrct) {
      return {
        error: true,
        message: "Incorrect credentials",
      };
    }
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
  };
};
