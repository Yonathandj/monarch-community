import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButtonUserInteractionLike } from "./sign-in-button";

import { likeAction } from "../_lib/actions";
import { getLikeByUserIdAndPostId, getTotalLikesByPostId } from "../_lib/data";

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

export default async function PostLikeButton({ userId, postId }) {
  const totalLikes = await getTotalLikesByPostId(postId);
  const likeCurrentUser = await getLikeByUserIdAndPostId(userId, postId);

  const updateLikeActionWithId = likeAction.bind(null, userId, postId);
  return (
    <>
      <SignedOut>
        <SignInButtonUserInteractionLike totalLikes={totalLikes} />
      </SignedOut>

      <SignedIn>
        <form action={updateLikeActionWithId}>
          <Button variant="ghost">
            {likeCurrentUser ? (
              <HeartFilledIcon className="mr-2 h-5 w-5 text-red-600" />
            ) : (
              <HeartIcon className="mr-2 h-5 w-5" />
            )}
            <span>{totalLikes ? totalLikes : 0}</span>
          </Button>
        </form>
      </SignedIn>
    </>
  );
}
