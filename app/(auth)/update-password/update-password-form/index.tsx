"use client";

import { Button } from "@/components/ui/button";
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
import { updatePasswordFormSchema as formSchema } from "@/validation/schema";
import { updatePassword } from "./actions";
import { toast } from "sonner";
import Link from "next/link";

export default function UpdatePasswordForm({ token }: { token: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // handler
    const response = await updatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    // if token is invalid
    if (response?.tokenInvalid) window.location.reload();

    // if failed, display error message in form
    if (response?.error) {
      form.setError("root", {
        message: response.message,
      });
    } else {
      // if succeeded
      form.reset();
      toast.success("Password Updated!", {
        description: "Your password has been updated successfully.",
      });
    }
  };

  return form.formState.isSubmitSuccessful ? (
    <div>
      Your password has been updated successfully.{" "}
      <Link href="/login" className="underline hover:bg-slate-50">
        Log in to your account
      </Link>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="flex flex-col gap-4"
          disabled={form.formState.isSubmitting}
        >
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
          <Button type="submit">Update Password</Button>
        </fieldset>
      </form>
    </Form>
  );
}
