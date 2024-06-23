"use client";
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
import { Input } from "@/components/ui/input";
import { maxSchema } from "@/schema/maxSchema";
import { useFilterStore } from "@/stores/filterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PriceFilter() {
  const { setTopPrice } = useFilterStore();

  const form = useForm<z.infer<typeof maxSchema>>({
    resolver: zodResolver(maxSchema),
    defaultValues: {
      topPrice: undefined,
    },
  });

  function onSubmit({ topPrice }: z.infer<typeof maxSchema>) {
    setTopPrice(Number(topPrice));
  }

  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Price</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pl-3 pr-8"
        >
          <FormField
            control={form.control}
            name="topPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Top Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormDescription>Enter your max price :</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
