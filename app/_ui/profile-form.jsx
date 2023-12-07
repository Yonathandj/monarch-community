"use client";

import Image from "next/image";

import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UpdateProfileButton from "./update-profile-button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";

export default function ProfileForm({ currentUser }) {
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
              defaultValue={currentUser.clerk.fullName}
            />
          </section>
          <section>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              defaultValue={currentUser.clerk.email}
            />
          </section>
          <section>
            <Label htmlFor="profileImage">Profile Image</Label>
            <section className="mt-2 flex items-center gap-x-2">
              <section>
                <UserAvatar currentUser={currentUser} />
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
              defaultValue={currentUser.profile.description}
            />
          </section>
          <section>
            <Label htmlFor="work">Work</Label>
            <Input
              id="work"
              type="text"
              name="work"
              placeholder="Fullstack at Google/Student at Harvard"
              defaultValue={currentUser.profile.work}
            />
          </section>
          <section>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              name="location"
              placeholder="London, England"
              defaultValue={currentUser.profile.location}
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
                defaultValue={currentUser.profile.socialMedia.instagram}
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
                defaultValue={currentUser.profile.socialMedia.facebook}
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
                defaultValue={currentUser.profile.socialMedia.twitter}
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
                defaultValue={currentUser.profile.socialMedia.tiktok}
              />
            </section>
          </section>
        </CardContent>
      </Card>

      <UpdateProfileButton
        _id={currentUser._id}
        profileImageURL={currentUser.clerk.profileImageURL}
      />
    </form>
  );
}
