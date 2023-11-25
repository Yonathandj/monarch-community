import { Button } from "@/components/ui/button";

import { SignOutButton as SignOutButtonClerk } from "@clerk/nextjs";

import { ScissorsIcon } from "@radix-ui/react-icons";

export default function SignOutButton() {
  return (
    <SignOutButtonClerk>
      <Button variant="secondary" className="rounded-2xl">
        <ScissorsIcon className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </SignOutButtonClerk>
  );
}

export function SignOutButtonUserAvatar() {
  return (
    <SignOutButtonClerk className="w-full flex justify-between items-center">
      <Button>
        Sign Out
        <ScissorsIcon className="w-4 h-4" />
      </Button>
    </SignOutButtonClerk>
  );
}
