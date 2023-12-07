import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";

export default async function UserCard({ currentUser }) {
  return (
    <Card
      className={`${className} mx-auto max-h-[300px] max-w-[400px] md:ml-4 lg:ml-0 lg:mt-4`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <UserAvatar currentUser={currentUser} />
          <h2 className="text-lg font-semibold">
            {currentUser.clerk.fullName}
          </h2>
        </CardTitle>
        <CardDescription>{currentUser.profile.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <section>
          <h4 className="font-semibold">Work</h4>
          <p className="text-sm">{currentUser.profile.work || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Location</h4>
          <p className="text-sm">{currentUser.profile.location || "-"}</p>
        </section>
        <section>
          <h4 className="font-semibold">Joined at</h4>
          <p className="text-sm">
            {currentUser.createdAt.toISOString().split("T")[0] || "-"}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
