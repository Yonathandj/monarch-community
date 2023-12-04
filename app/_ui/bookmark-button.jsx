import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";

export default function BookmarkButton({ userId, postId }) {
  return (
    <form>
      <Button variant="outline">
        <BookmarkIcon className="w-5 h-5" />
      </Button>
    </form>
  );
}
