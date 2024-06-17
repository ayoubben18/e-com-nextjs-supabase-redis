"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createComment } from "@/db/data/comment.data";
import commenInput from "@/schema/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  commentId: string;
}

export default function CommentInput({ commentId }: Props) {
  const form = useForm<z.infer<typeof commenInput>>({
    resolver: zodResolver(commenInput),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit({ description }: z.infer<typeof commenInput>) {
    await createComment(description, commentId);
  }

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
      {/* <div className="flex-1">
        <form>
          <Input
            type="text"
            placeholder="Write a comment..."
            className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          />
        </form>
      </div>
      <Button type="submit" size="sm">
        Add
      </Button> */}
      <div className="w-full flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add a comment..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
