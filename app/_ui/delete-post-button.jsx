"use client";

import { useEffect } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { useFormStatus, useFormState } from "react-dom";

import { deletePostAction } from "../_lib/actions";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";

export default function DeletePostButton({ postId, profileImageURL }) {
  const updateDeletePostActionWIthId = deletePostAction.bind(null, postId);

  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { edgestore } = useEdgeStore();
  const [state, dispatch] = useFormState(updateDeletePostActionWIthId, null);

  useEffect(() => {
    if (state?.errorPost) {
      toast({
        title: "Something went wrong",
        description: state.errorPost,
      });
    }
  }, [state, toast]);

  return (
    <Button
      disabled={pending}
      className="w-full rounded-2xl"
      formAction={async (formData) => {
        if (profileImageURL) {
          await edgestore.publicImages.delete({
            url: profileImageURL,
          });
        }
        dispatch(formData);
      }}
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
