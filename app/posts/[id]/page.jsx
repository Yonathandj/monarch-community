import { auth } from "@clerk/nextjs";

import UserCard from "@/app/_ui/user-card";
import PostDetail from "@/app/_ui/post-detail";
import UserInteraction from "@/app/_ui/user-interaction";
import { getPublishedPostById } from "@/app/_lib/data";

export default function Page({ params: { id } }) {
  const { userId } = auth();
  const { userId: currentUser } = getPublishedPostById(id);

  return (
    <main className="mt-6 flex">
      <UserInteraction userId={userId} postId={id} />
      <section className="flex flex-col-reverse lg:flex-row">
        <PostDetail postId={id} />
        <UserCard currentUser={currentUser} />
      </section>
    </main>
  );
}
