import { auth } from "@clerk/nextjs";
import { getUserById } from "@/app/_lib/data";

import ProfileForm from "@/app/_ui/profile-form";

export default async function Page() {
  const { userId } = auth();
  const selectedUser = JSON.parse(JSON.stringify(await getUserById(userId)));
  return (
    <>
      <ProfileForm selectedUser={selectedUser} />
    </>
  );
}
