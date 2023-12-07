import Link from "next/link";

import UserCard from "./user-card";
import { UserAvatar } from "./user-avatar";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";

import { getPublishedPosts, getUserById } from "../_lib/data";

export default async function PostsCard({ userId }) {
  const selectedUser = await getUserById(userId);
  const publishedPosts = await getPublishedPosts();

  return (
    <section className="mx-auto flex max-w-[600px] flex-col gap-y-4">
      {publishedPosts.map((publishedPost) => (
        <Card key={publishedPost._id} className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <UserAvatar />
              <section className="group relative">
                <h2 className="font-bold">{selectedUser.clerk.fullName}</h2>
                <p className="text-sm">
                  {publishedPost.createdAt.toISOString().split("T")[0] || "-"}
                </p>
                <section className="absolute z-10 hidden h-[300px] w-[300px] group-hover:block">
                  <UserCard userId={userId} />
                </section>
              </section>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Link href={`/posts/${publishedPost._id}`}>
              <h2 className="text-2xl font-bold">{publishedPost.data.title}</h2>
            </Link>
            <section className="mt-2 flex gap-x-2">
              {publishedPost.data.tags.length > 0
                ? publishedPost.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#edf2f7] px-2 text-sm"
                    >
                      #{tag}
                    </span>
                  ))
                : null}
            </section>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
