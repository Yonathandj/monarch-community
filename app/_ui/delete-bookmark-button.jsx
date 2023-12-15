"use client";

import { useFormStatus } from "react-dom";

import { deleteBookmarkAction } from "../_lib/actions";

import { Button } from "@/components/ui/button";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";

export default function DeleteBookmarkButton({ bookmarkId }) {
  const { pending } = useFormStatus();
  const updateDeleteBookmarkActionWithId = deleteBookmarkAction.bind(
    null,
    bookmarkId,
  );

  return (
    <Button
      disabled={pending}
      variant="destructive"
      className="w-full rounded-2xl"
      formAction={updateDeleteBookmarkActionWithId}
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
