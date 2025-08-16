import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokensSchema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import UpdatePasswordForm from "./update-password-form";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string;
  }>;
}) {
  const searchParamsValues = await searchParams;
  const { token } = searchParamsValues;

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
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-3xl">
          <CardTitle>
            {tokenIsValid
              ? "Update password"
              : "Your password reset link is invalid"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid ? (
            <UpdatePasswordForm token={token ?? ""} />
          ) : (
            <Link href="/password-reset" className="underline">
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
