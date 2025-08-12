"use server";

import { hash } from "bcryptjs";
import db from "@/db/drizzle";
import { registerFormSchema } from "@/validation/schema";
import { users } from "@/db/usersSchema";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const newUserValidation = registerFormSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message:
          newUserValidation.error.issues[0]?.message ?? "An error occurred",
      };
    }

    // if validation passed
    const hashedPassword = await hash(password, 10); // TODO
    await db.insert(users).values({
      email,
      password: hashedPassword,
    });
  } catch (e: any) {
    const code = (e as any)?.code ?? (e as any)?.cause?.code;
    if (code === "23505") {
      return {
        error: true,
        message: "An account is already registered with that email address.",
      };
    }

    return {
      error: true,
      message: "An error occurred",
    };
  }
};
