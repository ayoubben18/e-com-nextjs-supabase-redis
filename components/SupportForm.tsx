"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SupportForm = () => {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Contact Support</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below and our team will get back to you as soon as
          possible.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter a subject" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Write your message here..."
            className="min-h-[150px]"
          />
        </div>
        <p className="text-sm opacity-50">
          This doesn't work We have no real customers. We'll set it up later :)
        </p>
        <Button
          className="w-full"
          onClick={() => {
            toast.info(
              "Your message has been sent! We'll get back to you soon.",
            );
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SupportForm;
