import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButtonUserInteraction } from "./sign-in-button";

import { likeAction } from "../_lib/actions";
import { getLikeById, getTotalLikes } from "../_lib/data";

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

export default async function PostLikeButton({ userId, postId }) {
  const totalLikes = await getTotalLikes();
  const likeSelectedUser = await getLikeById(userId, postId);

  const updateLikeActionWithId = likeAction.bind(null, userId, postId);
  return (
    <>
      <SignedOut>
        <SignInButtonUserInteraction totalLikes={totalLikes} />
      </SignedOut>

      <SignedIn>
        <form action={updateLikeActionWithId}>
          <Button variant="outline">
            {likeSelectedUser ? (
              <HeartFilledIcon className="w-5 h-5 text-red-600 mr-2" />
            ) : (
              <HeartIcon className="w-5 h-5 mr-2" />
            )}
            <span>{totalLikes ? totalLikes : 0}</span>
          </Button>
        </form>
      </SignedIn>
    </>
  );
}
