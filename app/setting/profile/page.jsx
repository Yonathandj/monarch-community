import { auth } from "@clerk/nextjs";
import { getUserById } from "@/app/_lib/data";

import ProfileForm from "@/app/_ui/profile-form";

export default async function Page() {
  const { userId: _id } = auth();
  const currentUser = JSON.parse(JSON.stringify(await getUserById(_id)));
  return (
    <>
      <ProfileForm currentUser={currentUser} />
    </>
  );
}
