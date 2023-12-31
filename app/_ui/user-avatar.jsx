import { auth } from "@clerk/nextjs";

import { getUserByUserId } from "../_lib/data";

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

import { SignInButtonUserAvatar } from "./sign-in-button";
import { SignUpButtonUserAvatar } from "./sign-up-button";
import { SettingButtonUserAvatar } from "./setting-button";
import { SignOutButtonUserAvatar } from "./sign-out-button";
import { WritePostButtonUserAvatar } from "./write-post-button";

export default async function SignedInUserAvatar() {
  const { userId } = auth();
  const currentUser = await getUserByUserId(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={currentUser?.clerk?.profileImageURL}
            alt={`${currentUser?.clerk?.fullName} profile picture`}
          />
          <AvatarFallback>
            {currentUser?.clerk?.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel>
          <h2 className="text-sm font-bold">
            {currentUser?.clerk?.fullName || ""}
          </h2>
          <p className="text-xs">{currentUser?.clerk?.email || ""}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <WritePostButtonUserAvatar />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingButtonUserAvatar />
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
        <Avatar className="h-10 w-10">
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

export async function UserAvatar({ user }) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage alt={user.clerk.fullName} src={user.clerk.profileImageURL} />
      <AvatarFallback>{user.clerk.fullName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
