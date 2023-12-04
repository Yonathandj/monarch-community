import { Button } from "@/components/ui/button";

import { SignOutButton as SignOutButtonClerk } from "@clerk/nextjs";

import { ScissorsIcon } from "@radix-ui/react-icons";

export default function SignOutButton() {
  return (
    <SignOutButtonClerk>
      <Button variant="secondary" className="rounded-2xl">
        <ScissorsIcon className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </SignOutButtonClerk>
  );
}

export function SignOutButtonUserAvatar() {
  return (
    <SignOutButtonClerk className="flex w-full items-center justify-between">
      <Button>
        Sign Out
        <ScissorsIcon className="h-4 w-4" />
      </Button>
    </SignOutButtonClerk>
  );
}
