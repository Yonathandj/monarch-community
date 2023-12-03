import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostCard({ publishedPost }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Avatar</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
