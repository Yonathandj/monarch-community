import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";
import { getPublishedPostById } from "../_lib/data";

export default async function UserCard({ postId }) {
  const { userId: user } = await getPublishedPostById(postId);

  return (
    <Card className="mx-auto max-h-[400px] max-w-[300px] md:ml-4 lg:ml-0 lg:mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2 text-lg">
          <UserAvatar user={user} />
          {user.clerk.fullName}
        </CardTitle>
        <CardDescription>{user.profile.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <section>
          <h4 className="font-semibold">Work</h4>
          <p className="text-sm">{user.profile.work || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Location</h4>
          <p className="text-sm">{user.profile.location || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Joined at</h4>
          <p className="text-sm">
            {user.createdAt.toISOString().split("T")[0] || "-"}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
