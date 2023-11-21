import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { currentUser } from "@clerk/nextjs";

import WriteButton from "./write-button";
import SignOutButton from "./sign-out-button";

export default async function SignedInCard() {
  const { firstName, lastName } = await currentUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Welcome {`${firstName} ${lastName}`} to Monarch Community
        </CardTitle>
        <CardDescription>
          Share your thoughts and ideas now for everyone around the world
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-x-4">
        <WriteButton />
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
