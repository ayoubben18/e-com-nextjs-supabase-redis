"use client";
import { signup } from "@/app/(authenticate)/register/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useErrorHandler from "@/hooks/useErrorHandler";
import registerSchema from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string[]>([]);
  const { error, triggerError, clearError } = useErrorHandler();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    clearError();
    startTransition(() => {
      signup(values)
        .then((data) => {
          if (data?.error) {
            console.log(data.error);

            triggerError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => triggerError("An error occurred. Please try again."));
    });
  }

  return (
    <div className="mx-auto w-[25rem] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to create an Account.
        </p>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon doe" {...field} />
                  </FormControl>
                  <FormDescription>Enter your Name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@mail.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your Email.</FormDescription>
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
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your Password ( at least 6 characters ).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess messages={success} />
            <Button className="w-full" type="submit" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
        <div className="grid gap-4">
          <Link
            href={`/login`}
            className="text-center text-lg underline underline-offset-2"
          >
            Already have an account ? click to login
          </Link>
        </div>
      </div>
    </div>
  );
}
