"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokensSchema";
import { users } from "@/db/usersSchema";
import { updatePasswordFormSchema } from "@/validation/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const updatePassword = async ({
  token,
  password,
  passwordConfirm,
}: {
  token: string;
  password: string;
  passwordConfirm: string;
}) => {
  const passwordValidation = updatePasswordFormSchema.safeParse({
    password,
    passwordConfirm,
  });
  // if passwords are invalid
  if (!passwordValidation.success) {
    return {
      error: true,
      message:
        passwordValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const session = await auth();
  // if alreadly logged in
  if (session?.user?.id) {
    return {
      error: true,
      message: "Already logged in. Please log out to reset your password",
    };
  }

  let tokenIsValid = false;
  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();
    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry?.getTime()
    ) {
      tokenIsValid = true;
    }

    // if token is invalid
    if (!tokenIsValid) {
      return {
        error: true,
        message: "Your token is invalid",
        tokenInvalid: true,
      };
    }

    // if token is valid
    const hashedPassword = await hash(password, 10); // TODO
    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, passwordResetToken.userId as number));

    // remove the token
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, passwordResetToken.id));
  }
};
