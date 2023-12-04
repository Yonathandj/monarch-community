import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { auth } from "@clerk/nextjs";

import { getUserById } from "../_lib/data";

import WriteButton from "./write-button";
import SignOutButton from "./sign-out-button";

export default async function SignedInCard() {
  const { userId } = auth();
  const selectedUser = await getUserById(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Welcome{" "}
          <span className="text-purple-600">
            {selectedUser?.clerk?.fullName}
          </span>{" "}
          to Monarch Community
        </CardTitle>
        <CardDescription>
          Share your thoughts and ideas now for everyone around the world
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4">
        <WriteButton />
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
