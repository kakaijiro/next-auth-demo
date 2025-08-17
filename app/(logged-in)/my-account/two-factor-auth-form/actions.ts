"use server";

import { auth } from "@/auth";
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";
import { eq } from "drizzle-orm";
import { authenticator } from "otplib";

export const get2faSecret = async () => {
  const session = await auth();

  // if user is logged in
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  // fetch db
  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id || "0")));


  // if user exists
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  // generate a secret
  let twoFactorSecret = user.twoFactorSecret;
  if (!twoFactorSecret) {
    twoFactorSecret = authenticator.generateSecret();
    // update db
    await db
      .update(users)
      .set({
        twoFactorSecret,
      })
      .where(eq(users.id, parseInt(session.user.id || "0")));
  }


  return {
    twoFactorSecret: authenticator.keyuri(
      session.user.email as string,
      "NextAuthDemo",
      twoFactorSecret
    ),
  };
};

export const activate2fa = async (token: string) => {
  const session = await auth();

  // if logged in
  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  // get user
  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id || "0")));

  // if user exists
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  // get 2fa secret
  if (user.twoFactorSecret) {
    // Enhanced logging for debugging
    const expectedToken = authenticator.generate(user.twoFactorSecret);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeWindow = Math.floor(currentTime / 30);
    
    console.log("=== TOTP Verification Debug ===");
    console.log(`User Input: ${token}`);
    console.log(`Expected Token: ${expectedToken}`);
    console.log(`Secret: ${user.twoFactorSecret.substring(0, 8)}...`);
    console.log(`Current Time: ${new Date().toISOString()}`);
    console.log(`Time Window: ${timeWindow} (${timeWindow * 30}s - ${(timeWindow + 1) * 30}s)`);
    console.log(`Direct Match: ${token === expectedToken}`);
    console.log("===============================");
    
    const tokenValid = authenticator.check(token, user.twoFactorSecret);

    // if otp is valid
    if (!tokenValid) {
      return {
        error: true,
        message: "Invalid OTP",
      };
    }

    // update db
    await db
      .update(users)
      .set({ twoFactorActivated: true })
      .where(eq(users.id, parseInt(session.user.id || "0")));

    return {
      success: true,
      message: "Two-factor authentication activated successfully",
    };
  }

  return {
    error: true,
    message: "Two-factor secret not found",
  };
};

export const disable2fa = async()=>{
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: "Unauthorized"
    }
  }

  // update db
  await db
  .update(users)
  .set({ twoFactorActivated: false })
  .where(eq(users.id, parseInt(session.user.id || "0")));
}