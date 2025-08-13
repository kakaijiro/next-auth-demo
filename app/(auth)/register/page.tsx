import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import Link from "next/link";

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
        <div className="border-t-1 mx-4 border-slate-200" />
        <CardFooter>
          <div className="flex">
            <p className="pr-1">Already have an account?</p>
            <Link href="/login" className="underline hover:bg-slate-50">
              Login here.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
