import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | DevOverflow",
  description: "Sign up for a DevOverflow account.",
};

export default function Page() {
  return <SignUp />;
}
