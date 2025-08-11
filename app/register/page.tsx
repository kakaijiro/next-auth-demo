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

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new accout</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
