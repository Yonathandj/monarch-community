import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function CommentButton({ userId, postId }) {
  return (
    <form>
      <Button variant="outline">
        <ChatBubbleIcon className="w-5 h-5" />
      </Button>
    </form>
  );
}
