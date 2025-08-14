"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";
import { passwordChangeFormSchema } from "@/validation/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const changePassword = async ({
  currentPassword,
  newPassword,
  newPasswordConfirm,
}: {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}) => {
  const session = await auth();

  // if not logged in
  if (!session?.user?.id) {
    return {
      error: true,
      message: "You must be logged in to change your password",
    };
  }

  // validate inputs
  const passwordValidation = passwordChangeFormSchema.safeParse({
    currentPassword,
    newPassword,
    newPasswordConfirm,
  });

  // if failed
  if (passwordValidation?.error) {
    return {
      error: true,
      message:
        passwordValidation?.error?.issues?.[0]?.message ?? "An error occurred",
    };
  }

  // if succeeded
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)));

  // if no user found
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  // comparing currentPassword with db's password (hashed)
  const passwordMatch = await compare(currentPassword, user.password as string);

  // if passwords didn't match
  if (!passwordMatch) {
    return {
      error: true,
      message: "Current password is incorrect.",
    };
  }

  // finally, update db's password
  const hashedPassword = await hash(newPassword, 10); // TODO
  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, parseInt(session.user.id)));
};
