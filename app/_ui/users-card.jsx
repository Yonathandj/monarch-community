import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
