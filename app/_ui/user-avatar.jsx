import { auth } from "@clerk/nextjs";

import { getUserById } from "../_lib/data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { WriteButtonUserAvatar } from "./write-button";
import { ProfileButtonUserAvatar } from "./profile-button";
import { SignOutButtonUserAvatar } from "./sign-out-button";
import { SignInButtonUserAvatar } from "./sign-in-button";
import { SignUpButtonUserAvatar } from "./sign-up-button";

export default async function SignedInUserAvatar() {
  const { userId } = auth();
  const selectedUser = await getUserById(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={selectedUser?.clerk?.profileImageURL}
            alt={`${selectedUser?.clerk?.fullName} Profile Image`}
          />
          <AvatarFallback>
            {selectedUser?.clerk?.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel>
          <h2 className="text-sm font-bold">
            {selectedUser?.clerk?.fullName || ""}
          </h2>
          <p className="text-xs">{selectedUser?.clerk?.email || ""}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <WriteButtonUserAvatar />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ProfileButtonUserAvatar />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButtonUserAvatar />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SignedOutUserAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={"/no-user.png"}
            alt={`No Signed In User Profile Image`}
          />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel>
          <h2 className="text-sm font-bold">Unknown</h2>
          <p className="text-xs">unknown@gmail.com</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SignInButtonUserAvatar />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButtonUserAvatar />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
