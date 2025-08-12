import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-3xl">
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new accout</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <Separator />
        <CardFooter>
          <p className="pr-1">Already have an account? Login</p>
          <Link href="/login" className="underline hover:bg-slate-50">
            here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
