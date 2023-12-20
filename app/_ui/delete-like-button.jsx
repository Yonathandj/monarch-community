"use client";

import { useFormStatus } from "react-dom";
import { deleteLikeAction } from "../_lib/actions";

import { Button } from "@/components/ui/button";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";

export default function DeleteLikeButton({ likeId }) {
  const { pending } = useFormStatus();
  const updateDeleteLikeActionWithId = deleteLikeAction.bind(null, likeId);

  return (
    <Button
      disabled={pending}
      variant="destructive"
      className="w-full rounded-2xl"
      formAction={updateDeleteLikeActionWithId}
    >
      {pending ? (
        <GearIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <TrashIcon className="mr-2 h-4 w-4" />
      )}
      Delete
    </Button>
  );
}
