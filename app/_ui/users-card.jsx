import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { getTotalUsers } from "../_lib/data";

import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";

export default async function UsersCard() {
  const totalUsers = await getTotalUsers();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Monarch Community is a community of{" "}
          <span className="text-purple-600">{totalUsers}</span> amazing bloggers
        </CardTitle>
        <CardDescription>
          Place where bloggers share, stay up-to-date and grow their careers.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-x-4">
        <SignInButton />
        <SignUpButton />
      </CardFooter>
    </Card>
  );
}
