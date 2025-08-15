"use client";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { resetPasswordFormSchema as formSchema } from "@/validation/schema";
import { passwordReset } from "./actions";

export default function PasswordResetForm({ email }: { email: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      email: email ?? "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // handler
    await passwordReset(data.email);
    // if failed display error message in form
    // if succeeded
  };
  return form.formState.isSubmitSuccessful ? (
    <Card className="max-w-sm w-full">
      <CardHeader className="text-3xl">
        <CardTitle>Email Sent</CardTitle>
      </CardHeader>
      <CardContent>
        You will recieve a password reset email at {form.getValues("email")}.
      </CardContent>
    </Card>
  ) : (
    <Card className="max-w-sm w-full">
      <CardHeader className="text-3xl">
        <CardTitle>Password Rest</CardTitle>
        <CardDescription>
          Enter your email to reset your password.
        </CardDescription>
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
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!form.formState.errors.root?.message && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <Button type="submit">Reset Password</Button>
            </fieldset>
          </form>
        </Form>
      </CardContent>
      <div className="border-t-1 mx-4 border-slate-200 " />
      <CardFooter className="flex flex-col items-start justify-center">
        <div className="flex">
          <p className="mr-1">Remember your password?</p>
          <Link href="/login" className="underline hover:bg-slate-50">
            Login
          </Link>
        </div>
        <div className="flex">
          <p className="mr-1">Don&apos;t have an account?</p>
          <Link href="/register" className="underline hover:bg-slate-50">
            Register here.
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
