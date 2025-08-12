import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-3xl">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <Separator />
        <CardFooter>
          <p className="pr-1">Haven&apos;t an account? Register</p>
          <Link href="/register" className="underline hover:bg-slate-50">
            here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
