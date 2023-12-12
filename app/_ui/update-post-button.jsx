"use client";

import { useEdgeStore } from "../_lib/edgestore";
import { updatePostAction } from "../_lib/actions";
import { useFormStatus, useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";

export default function UpdatePostButton({
  postId,
  initialHeaderImageURL,
  updatedPublishedPost,
  setUpdatedPublishedPost,
}) {
  const updatePostActionWithId = updatePostAction.bind(null, postId);

  const { pending } = useFormStatus();
  const { edgestore } = useEdgeStore();
  const [state, dispatch] = useFormState(updatePostActionWithId, null);

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
          setUpdatedPublishedPost({
            ...updatedPublishedPost,
            headerImageURL: response.url,
          });
        } else if (
          initialHeaderImageURL &&
          !updatedPublishedPost.headerImageURL
        ) {
          await edgestore.publicImages.delete({
            url: initialHeaderImageURL,
          });
          setUpdatedPublishedPost({
            ...updatedPublishedPost,
            headerImageURL: "",
          });
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
          setUpdatedPublishedPost({
            ...updatedPublishedPost,
            headerImageURL: response.url,
          });
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
