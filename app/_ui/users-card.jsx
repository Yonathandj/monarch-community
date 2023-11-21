import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";

export default function UsersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Monarch Community is a community of 1,194,194 amazing bloggers
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
