"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { ArrowTopRightIcon, GearIcon } from "@radix-ui/react-icons";

export default function PublishButton({ dispatch }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="rounded-2xl" formAction={dispatch}>
      {pending ? (
        <GearIcon className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <ArrowTopRightIcon className="w-4 h-4 mr-2" />
      )}
      Publish
    </Button>
  );
}
