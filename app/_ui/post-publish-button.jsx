"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { ArrowTopRightIcon, GearIcon } from "@radix-ui/react-icons";

export default function PostPublishButton({ dispatch }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="rounded-2xl" formAction={dispatch}>
      {pending ? (
        <GearIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ArrowTopRightIcon className="mr-2 h-4 w-4" />
      )}
      Publish
    </Button>
  );
}
