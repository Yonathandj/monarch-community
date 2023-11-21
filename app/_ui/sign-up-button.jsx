import { Button } from "@/components/ui/button";

import { SignUpButton as SignUpButtonClerk } from "@clerk/nextjs";

import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function SignUpButton() {
  return (
    <SignUpButtonClerk>
      <Button variant="secondary" className="rounded-2xl">
        <LightningBoltIcon className="w-4 h-4 mr-2" />
        Sign Up
      </Button>
    </SignUpButtonClerk>
  );
}
