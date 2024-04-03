import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Profile from "@/components/forms/Profile";

import { getUserById } from "@/lib/actions/user.action";

import type { ParamsProps } from "@/types";
import type { Metadata } from "next";

import { currentProfile } from "@/lib/fetchUserData";

export const metadata: Metadata = {
  title: "Edit Profile — DevOverflow",
};

const Page = async ({ params }: ParamsProps) => {
  // const { userId } = auth();
  //const userId = "65ebb3d12f7d3011af8cb203";
  const user = await currentProfile();
  const userId = user._id.toString();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  if (!mongoUser?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile userId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;
