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
