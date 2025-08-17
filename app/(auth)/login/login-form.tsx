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
import { loginWithCredential, preLoginCheck } from "./actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // pre login check
    const preloginCheckResponse = await preLoginCheck({
      email: data.email,
      password: data.password,
    });

    if (preloginCheckResponse?.error) {
      form.setError("root", {
        message: preloginCheckResponse.message,
      });
      return;
    }

    // if 2fa is activated
    if (preloginCheckResponse.twoFactorActivated) {
      // 2fa is applied
      setStep(2);
    } else {
      // 2fa is not applied
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
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await loginWithCredential({
      email: form.getValues("email"),
      password: form.getValues("password"),
      token: otp,
    });

    if (response?.error) {
      // if failed display error message ivia toast
      toast.error("Error", {
        description: response.message,
      });
    } else {
      // if succeeded
      router.push("/my-account");
    }
  };

  // fetch email as derived value
  const email = form.watch("email");

  return (
    <>
      {step === 1 && (
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
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
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
                href={
                  email
                    ? `/password-reset?email=${encodeURIComponent(email)}`
                    : `/password-reset`
                }
                className="underline hover:bg-slate-50"
              >
                Reset your password
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
      {step === 2 && (
        <Card className="max-w-sm w-full">
          <CardHeader className="text-3xl">
            <CardTitle>One-Time Passcode</CardTitle>
            <CardDescription>
              Please enter the one-time passcode from the Google Authenticator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleOTPSubmit}
              className="flex flex-col justify-center items-center gap-4"
            >
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                variant="default"
                type="submit"
                disabled={otp.length !== 6}
                className="w-full"
              >
                Verify OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
