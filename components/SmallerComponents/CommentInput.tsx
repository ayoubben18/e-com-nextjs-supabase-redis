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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const { isPending, mutate } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: async ({ description }: z.infer<typeof commenInput>) => {
      await createComment(description, commentId);
      form.reset();
    },
    onError: (error) => {
      toast.error("Something went wrong !");
    },
    onSuccess: () => {
      toast.success("Comment Added !");
    },
  });

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="flex gap-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input placeholder="Add a comment..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Add
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
