import { auth } from "@clerk/nextjs";
import { getUserById } from "@/app/_lib/data";

import { UserAvatar } from "@/app/_ui/user-avatar";
import UpdateProfileForm from "@/app/_ui/update-profile-form";

export default async function Page() {
  const { userId: _id } = auth();
  const currentUser = JSON.parse(JSON.stringify(await getUserById(_id)));
  return (
    <>
      <UpdateProfileForm currentUser={currentUser}>
        <UserAvatar user={currentUser} />
      </UpdateProfileForm>
    </>
  );
}
