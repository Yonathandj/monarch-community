"use client";

import { useEffect } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { updatePostAction } from "../_lib/actions";
import { useFormStatus, useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";

export default function UpdatePostButton({
  postId,
  updatedPublishedPost,
  initialHeaderImageURL,
}) {
  const updatePostActionWithId = updatePostAction.bind(
    null,
    postId,
    JSON.stringify(updatedPublishedPost),
  );

  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { edgestore } = useEdgeStore();
  const [state, dispatch] = useFormState(updatePostActionWithId, null);

  useEffect(() => {
    if (state?.errorPostExistence) {
      toast({
        title: "Something went wrong",
        description: state.errorPostExistence,
      });
    }
    if (state?.errorTitle) {
      toast({
        title: "Something went wrong",
        description: state.errorTitle,
      });
    }
  }, [state, toast]);

  return (
    <Button
      disabled={pending}
      variant="secondary"
      className="rounded-2xl bg-yellow-400"
      formAction={async (formData) => {
        if (!initialHeaderImageURL && updatedPublishedPost.headerImageURL) {
          const response = await edgestore.publicImages.upload({
            file: updatedPublishedPost.headerImageURL,
          });
          formData.set("validHeaderImageURL", response.url);
        } else if (
          initialHeaderImageURL &&
          !updatedPublishedPost.headerImageURL
        ) {
          await edgestore.publicImages.delete({
            url: initialHeaderImageURL,
          });
          formData.set("validHeaderImageURL", "");
        } else if (
          initialHeaderImageURL &&
          updatedPublishedPost.headerImageURL &&
          initialHeaderImageURL !== updatedPublishedPost.headerImageURL
        ) {
          const response = await edgestore.publicImages.upload({
            file: updatedPublishedPost.headerImageURL,
            options: {
              replaceTargetUrl: initialHeaderImageURL,
            },
          });
          formData.set("validHeaderImageURL", response.url);
        } else {
          formData.set("validHeaderImageURL", initialHeaderImageURL);
        }
        dispatch(formData);
      }}
    >
      {pending ? (
        <GearIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PersonIcon className="mr-2 h-4 w-4" />
      )}
      Update
    </Button>
  );
}
