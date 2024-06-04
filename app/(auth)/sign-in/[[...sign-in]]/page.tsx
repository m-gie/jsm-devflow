import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | DevOverflow",
  description: "Sign in to your DevOverflow account.",
};

export default function Page() {
  return <SignIn />;
}
