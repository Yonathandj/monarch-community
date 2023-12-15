import { Button } from "@/components/ui/button";

import { SignUpButton as SignUpButtonClerk } from "@clerk/nextjs";

import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function SignUpButton() {
  return (
    <SignUpButtonClerk>
      <Button className="rounded-2xl">
        <LightningBoltIcon className="mr-2 h-4 w-4" />
        Sign Up
      </Button>
    </SignUpButtonClerk>
  );
}

export function SignUpButtonUserAvatar() {
  return (
    <SignUpButtonClerk className="flex w-full items-center justify-between">
      <Button>
        Sign Up
        <LightningBoltIcon className="h-4 w-4" />
      </Button>
    </SignUpButtonClerk>
  );
}
