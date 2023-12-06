"use client";

import Image from "next/image";

import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UpdateProfileButton from "./update-profile-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function ProfileForm({ selectedUser }) {
  return (
    <form className="flex max-w-[500px] flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>
            Describe yourself by filling in your full name, email and profile
            picture below
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-4">
          <section>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              type="text"
              id="fullname"
              name="fullName"
              placeholder="Enter your full name"
              defaultValue={selectedUser.clerk.fullName}
            />
          </section>
          <section>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              defaultValue={selectedUser.clerk.email}
            />
          </section>
          <section>
            <Label htmlFor="profileImage">Profile Image</Label>
            <section className="mt-2 flex items-center gap-x-2">
              <section>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.clerk.profileImageURL} />
                  <AvatarFallback>
                    {selectedUser.clerk.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </section>
              <section>
                <Input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImageURL"
                />
              </section>
            </section>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Describe yourself by filling in the description and social media
            links below
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-4">
          <section>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter your description"
              defaultValue={selectedUser.profile.description}
            />
          </section>
          <section className="flex flex-col gap-y-2">
            <section className="flex flex-col gap-y-2">
              <Label htmlFor="instagram">
                <InstagramLogoIcon className="h-5 w-5 text-red-600" />
              </Label>
              <Input
                type="url"
                id="instagram"
                name="instagram"
                autoComplete="off"
                placeholder="Enter your Instagram link"
                defaultValue={selectedUser.profile.socialMedia.instagram}
              />
            </section>
            <section className="flex flex-col gap-y-2">
              <Label htmlFor="facebook">
                <Image
                  width={20}
                  height={20}
                  alt="Facebook Icon"
                  src={"/facebook.png"}
                />
              </Label>
              <Input
                type="url"
                id="facebook"
                name="facebook"
                autoComplete="off"
                placeholder="Enter your Facebook link"
                defaultValue={selectedUser.profile.socialMedia.facebook}
              />
            </section>
            <section className="flex flex-col gap-y-2">
              <Label htmlFor="twitter">
                <TwitterLogoIcon className="h-5 w-5 text-sky-600" />
              </Label>
              <Input
                type="url"
                id="twitter"
                name="twitter"
                autoComplete="off"
                placeholder="Enter your Twitter link"
                defaultValue={selectedUser.profile.socialMedia.twitter}
              />
            </section>
            <section className="flex flex-col gap-y-2">
              <Label htmlFor="tiktok">
                <Image
                  width={20}
                  height={20}
                  alt="Tiktok Icon"
                  src={"/tiktok.png"}
                />
              </Label>
              <Input
                type="url"
                id="tiktok"
                name="tiktok"
                autoComplete="off"
                placeholder="Enter your Tiktok link"
                defaultValue={selectedUser.profile.socialMedia.tiktok}
              />
            </section>
          </section>
        </CardContent>
      </Card>

      <UpdateProfileButton
        userId={selectedUser.clerk.userId}
        profileImageURL={selectedUser.clerk.profileImageURL}
      />
    </form>
  );
}
