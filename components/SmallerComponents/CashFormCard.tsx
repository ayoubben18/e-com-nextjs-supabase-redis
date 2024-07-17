"use client";
import cashSchema from "@/schema/cashSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCashStore from "@/stores/cashStore";
import { useState } from "react";

const CashFormCard = () => {
  const { setCredentials } = useCashStore();
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof cashSchema>>({
    resolver: zodResolver(cashSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof cashSchema>) {
    setCredentials(values);
    setSubmitted(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash</CardTitle>
        <CardDescription>
          Make changes to your delivery address and phone number.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={submitted}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={submitted}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={submitted}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+212..." {...field} />
                  </FormControl>
                  <FormDescription>This is your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={submitted}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="City, neighbourhood, N" {...field} />
                  </FormControl>
                  <FormDescription>This is your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={submitted} type="submit">
              Submit
            </Button>
            {submitted && (
              <Button
                className="text-lg font-semibold"
                variant="linkHover2"
                type="button"
                onClick={() => {
                  setSubmitted(false);
                }}
              >
                edit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CashFormCard;
