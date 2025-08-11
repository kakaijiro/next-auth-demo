"use server";

import { hash } from "bcryptjs";
import db from "@/db/drizzle";
import { registerFormSchema as newUserSchema } from "@/validation/schema";
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
  const newUserValidation = newUserSchema.safeParse({
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
};
