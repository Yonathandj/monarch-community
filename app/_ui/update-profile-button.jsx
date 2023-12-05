"use client";

import { useFormStatus } from "react-dom";
import { useEdgeStore } from "../_lib/edgestore";
import { userProfileAction } from "../_lib/actions";

import { Button } from "@/components/ui/button";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";

export default function UpdateProfileButton({ profileImageURL, userId }) {
  const { edgestore } = useEdgeStore();
  const { pending } = useFormStatus();

  const updateUserProfileActionWithId = userProfileAction.bind(null, userId);
  return (
    <Button disabled={pending} formAction={updateUserProfileActionWithId}>
      {pending ? (
        <GearIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PersonIcon className="mr-2 h-4 w-4" />
      )}
      Save Profile Information
    </Button>
  );
}
