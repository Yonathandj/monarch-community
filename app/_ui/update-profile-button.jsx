"use client";

import { useEffect } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { updateUserProfileAction } from "../_lib/actions";
import { useFormStatus, useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";

export default function UpdateProfileButton({ _id, profileImageURL }) {
  const updateUpdateUserProfileActionWithUserId = updateUserProfileAction.bind(
    null,
    _id,
  );

  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { edgestore } = useEdgeStore();
  const [state, dispatch] = useFormState(
    updateUpdateUserProfileActionWithUserId,
    null,
  );

  useEffect(() => {
    if (state?.errorValidation?.fullName) {
      toast({
        title: "Something went wrong",
        description: state.errorValidation.fullName[0],
      });
    }
    if (state?.errorValidation?.email) {
      toast({
        title: "Something went wrong",
        description: state.errorValidation.email[0],
      });
    }
    if (state?.successMessage) {
      toast({
        title: "Operation success",
        description: state.successMessage,
      });
    }
  }, [state, toast]);

  return (
    <Button
      disabled={pending}
      formAction={async (formData) => {
        if (
          formData.get("profileImageURL")?.size > 0 &&
          formData.get("profileImageURL")?.name !== "undefined"
        ) {
          if (profileImageURL.includes("https://files.edgestore.dev")) {
            const response = await edgestore.publicImages.upload({
              file: formData.get("profileImageURL"),
              options: {
                replaceTargetUrl: profileImageURL,
              },
            });
            formData.set("profileImageURL", response.url);
          } else {
            const response = await edgestore.publicImages.upload({
              file: formData.get("profileImageURL"),
            });
            formData.set("profileImageURL", response.url);
          }
        }
        dispatch(formData);
      }}
      className="rounded-2xl"
    >
      {pending ? (
        <GearIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PersonIcon className="mr-2 h-4 w-4" />
      )}
      Save Profile Information
    </Button>
  );
}
