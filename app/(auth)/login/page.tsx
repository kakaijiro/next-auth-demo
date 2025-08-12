import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import Link from "next/link";

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
        <div className="border-t-1 mx-4 border-slate-200 " />
        <CardFooter className="flex flex-col items-start justify-center">
          <div className="flex">
            <p className="mr-1">Don&apos;t have an account? Register</p>
            <Link href="/register" className="underline hover:bg-slate-50">
              here.
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1">Forget password?</p>
            <Link
              href="/reset-password"
              className="underline hover:bg-slate-50"
            >
              Reset your password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
