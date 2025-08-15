"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";
import { loginFormSchema as formSchema } from "@/validation/schema";
import { loginWithCredential } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // handler
    const response = await loginWithCredential({
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      // if failed display error message in form
      form.setError("root", {
        message: response.message,
      });
    } else {
      // if succeeded
      router.push("/my-account");
    }
  };

  // fetch email as derived value
  const email = form.watch("email");
  
  return (
    <Card className="max-w-sm w-full">
        <CardHeader className="text-3xl">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="flex flex-col gap-4"
          disabled={form.formState.isSubmitting}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}
          <Button type="submit">Login</Button>
        </fieldset>
      </form>
    </Form>
        </CardContent>
        <div className="border-t-1 mx-4 border-slate-200 " />
        <CardFooter className="flex flex-col items-start justify-center">
          <div className="flex">
            <p className="mr-1">Don&apos;t have an account?</p>
            <Link href="/register" className="underline hover:bg-slate-50">
              Register.
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1">Forget password?</p>
            <Link
              href={email ? `/password-reset?email=${encodeURIComponent(email)}` : `/password-reset`}
              className="underline hover:bg-slate-50"
            >
              Reset your password
            </Link>
          </div>
        </CardFooter>
      </Card>
  );
}
