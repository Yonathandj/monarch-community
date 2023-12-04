import { auth } from "@clerk/nextjs";

import PostDetail from "@/app/_ui/post-detail";
import UserInteraction from "@/app/_ui/user-interaction";

export default function Page({ params: { id } }) {
  const { userId } = auth();

  return (
    <main className="mt-6 flex">
      <UserInteraction userId={userId} postId={id} />
      <PostDetail postId={id} />
    </main>
  );
}
