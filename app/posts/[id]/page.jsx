import { auth } from "@clerk/nextjs";

import PostDetail from "@/app/_ui/post-detail";
import UserInteraction from "@/app/_ui/user-interaction";
import UserCard from "@/app/_ui/user-card";

export default function Page({ params: { id } }) {
  const { userId } = auth();

  return (
    <main className="mt-6 flex">
      <UserInteraction userId={userId} postId={id} />
      <section className="flex flex-col-reverse md:flex-row">
        <PostDetail postId={id} />
        <UserCard userId={userId} />
      </section>
    </main>
  );
}
