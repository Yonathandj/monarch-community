import { Button } from "@/components/ui/button";

import { SignInButton as SignInButtonClerk } from "@clerk/nextjs";

import { BookmarkIcon, HeartIcon, RocketIcon } from "@radix-ui/react-icons";

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

export function SignInButtonUserInteractionLike({ totalLikes }) {
  return (
    <SignInButtonClerk mode="modal">
      <Button variant="outline">
        <HeartIcon className="w-5 h-5 mr-2" />
        <span>{totalLikes ? totalLikes : 0}</span>
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonUserInteractionBookmark({ totalBookmarks }) {
  return (
    <SignInButtonClerk mode="modal">
      <Button variant="outline">
        <BookmarkIcon className="w-5 h-5 mr-2" />
        <span>{totalBookmarks ? totalBookmarks : 0}</span>
      </Button>
    </SignInButtonClerk>
  );
}
