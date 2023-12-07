import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUserById } from "../_lib/data";
import { CookieIcon } from "@radix-ui/react-icons";

export default async function UserCard({ userId }) {
  const selectedUser = await getUserById(userId);

  return (
    <Card className="max-h-[400px] max-w-[400px]">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={selectedUser.clerk.fullName}
              src={selectedUser.clerk.profileImageURL}
            />
            <AvatarFallback>
              {selectedUser.clerk.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold">{selectedUser.clerk.fullName}</h2>
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
      </CardContent>
      <CardFooter>
        <p>
          <span>
            Joined at <CookieIcon className="h-2 w-2" />
            {selectedUser.createdAt.toISOString().split("T")[0]}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
