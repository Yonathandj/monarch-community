"use client";

import { addCommentAction } from "../_lib/actions";

import { useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GearIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export default function PostPublishCommentButton({
  userId,
  parentCommentId,
}) {
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const updateAddCommentActionWithId = addCommentAction.bind(
    null,
    userId,
    parentCommentId,
  );

  const [state, dispatch] = useFormState(updateAddCommentActionWithId, null);

  useEffect(() => {
    if (state?.errorValidation?.content) {
      toast({
        title: "Something went wrong",
        description: state.errorValidation.content[0],
      });
    }
  }, [state, toast]);

  return (
    <Button disabled={pending} className="rounded-2xl" formAction={dispatch}>
      {pending ? (
        <GearIcon className="h-4 w-4 animate-spin" />
      ) : (
        <PaperPlaneIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
