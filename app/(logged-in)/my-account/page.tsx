import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TwoFactorAuthForm from "./two-factor-auth-form";
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";
import { eq } from "drizzle-orm";

export default async function page() {
  const session = await auth();
  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, parseInt(session?.user?.id || "0")));

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <Card className="max-w-sm w-full">
          <CardHeader className="text-3xl">
            <CardTitle>My Account</CardTitle>
            <CardDescription>User details</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Label>Email Address</Label>
            <div className="text-muted-foreground">{session?.user?.email}</div>
          </CardContent>
          <div className="border-t-1 mx-4 border-slate-200" />
          <CardFooter>
            <TwoFactorAuthForm
              twoFactorActivated={user?.twoFactorActivated ?? false}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
