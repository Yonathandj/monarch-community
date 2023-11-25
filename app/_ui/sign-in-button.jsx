import { SignInButton as SignInButtonClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { RocketIcon } from "@radix-ui/react-icons";

export default function SignInButton() {
  return (
    <SignInButtonClerk>
      <Button variant="outline" className="rounded-2xl">
        <RocketIcon className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonUserAvatar() {
  return (
    <SignInButtonClerk className="w-full flex justify-between items-center">
      <Button>
        Sign In
        <RocketIcon className="w-4 h-4" />
      </Button>
    </SignInButtonClerk>
  );
}
