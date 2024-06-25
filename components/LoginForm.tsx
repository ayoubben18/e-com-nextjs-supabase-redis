"use client";
import { login } from "@/app/(authenticate)/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useErrorHandler from "@/hooks/useErrorHandler";
import loginSchema from "@/schema/loginSchema";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChromeIcon, FacebookIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
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

interface Props {
  logged: boolean;
}

export default function LoginForm({ logged }: Props) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string[]>([]);
  const { error, triggerError, clearError } = useErrorHandler();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (logged) {
      triggerError("You are already logged in. Logout and retry");
    }
  }, [logged, triggerError]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    clearError();
    setSuccess([]);
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) {
            setSuccess(["Login successful!!"]);
          }
          if (data?.error) {
            form.reset();
            triggerError(data.error);
          }
        })
        .catch(() => triggerError("An error occurred. Please try again."));
    });
  }

  const signInWithAuth = async (provider: "google" | "facebook") => {
    const supabase = createClient();
    let whatENV;
    const env = process.env.NODE_ENV;
    if (env === "development") {
      whatENV = "http://localhost:3000";
    } else if (env === "production") {
      whatENV = process.env.NEXT_PUBLIC_URL!;
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${whatENV}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error", error);
      return;
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and password to access your account
        </p>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={logged}
                      placeholder="jhon@mail.com"
                      {...field}
                    />
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
                    <Input disabled={logged} placeholder="******" {...field} />
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
              Submit
            </Button>
          </form>
        </Form>
        <div className="grid gap-4">
          <Link
            href={`/register`}
            className="text-center text-lg underline underline-offset-2"
          >
            Don't have an account ? click to register
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                signInWithAuth("google");
              }}
            >
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
