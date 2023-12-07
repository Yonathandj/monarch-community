import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";

import { getUserById } from "../_lib/data";

export default async function UserCard({ userId, className }) {
  const selectedUser = await getUserById(userId);

  return (
    <Card
      className={`${className} mx-auto max-h-[300px] max-w-[400px] md:ml-4 lg:ml-0 lg:mt-4`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <UserAvatar userId={userId} />
          <h2 className="text-lg font-semibold">
            {selectedUser.clerk.fullName}
          </h2>
        </CardTitle>
        <CardDescription>{selectedUser.profile.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <section>
          <h4 className="font-semibold">Work</h4>
          <p className="text-sm">{selectedUser.profile.work || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Location</h4>
          <p className="text-sm">{selectedUser.profile.location || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Joined at</h4>
          <p className="text-sm">
            {selectedUser.createdAt.toISOString().split("T")[0] || "-"}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
