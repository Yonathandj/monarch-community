import { auth } from "@clerk/nextjs";
import LikesTable from "@/app/_ui/likes-table";

export default function Page() {
  const { userId } = auth();
  return (
    <>
      <LikesTable userId={userId} />
    </>
  );
}
