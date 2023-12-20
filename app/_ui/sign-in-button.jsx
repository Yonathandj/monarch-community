import { Button } from "@/components/ui/button";

import { SignInButton as SignInButtonClerk } from "@clerk/nextjs";

import {
  PaperPlaneIcon,
  BookmarkIcon,
  RocketIcon,
  HeartIcon,
} from "@radix-ui/react-icons";

export default function SignInButton() {
  return (
    <SignInButtonClerk>
      <Button variant="outline" className="rounded-2xl">
        <RocketIcon className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonUserAvatar() {
  return (
    <SignInButtonClerk className="flex w-full items-center justify-between">
      <Button>
        Sign In
        <RocketIcon className="h-4 w-4" />
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonUserInteractionLike({ totalLikes }) {
  return (
    <SignInButtonClerk mode="modal">
      <Button variant="outline">
        <HeartIcon className="mr-2 h-5 w-5" />
        <span>{totalLikes ? totalLikes : 0}</span>
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonUserInteractionBookmark({ totalBookmarks }) {
  return (
    <SignInButtonClerk mode="modal">
      <Button variant="outline">
        <BookmarkIcon className="mr-2 h-5 w-5" />
        <span>{totalBookmarks ? totalBookmarks : 0}</span>
      </Button>
    </SignInButtonClerk>
  );
}

export function SignInButtonPostPublishComment() {
  return (
    <SignInButtonClerk mode="modal">
      <Button>
        <PaperPlaneIcon className="h-4 w-4" />
      </Button>
    </SignInButtonClerk>
  );
}
