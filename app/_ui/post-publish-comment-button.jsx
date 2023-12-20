"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { GearIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export default function PostPublishCommentButton({ userId }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="rounded-2xl">
      {pending ? (
        <GearIcon className="h-4 w-4 animate-spin" />
      ) : (
        <PaperPlaneIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
