"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const pathname = usePathname();
  const userId = useAuth();
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") {
            if (userId.userId) {
              link.route = `${link.route}/${userId.userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              key={link.route}
              href={link.route}
              className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div>
        <SignedIn>
          <SignOutButton>
            <div className="text-dark300_light900 flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4">
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={18}
                height={18}
                className="invert-colors"
              />
              <p className="base-medium max-lg:hidden">Sign Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  alt="sign up"
                  width={20}
                  height={20}
                  className="lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 inline-flex h-9 min-h-[41px] w-full items-center justify-center rounded-lg border bg-slate-900 px-4 py-3 text-sm font-medium shadow-none transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign up"
                  width={20}
                  height={20}
                  className="lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;
