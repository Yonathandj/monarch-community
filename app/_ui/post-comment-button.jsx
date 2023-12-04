import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function PostCommentButton({ userId, postId }) {
  return (
    <form>
      <Button variant="outline">
        <ChatBubbleIcon className="h-5 w-5" />
      </Button>
    </form>
  );
}
