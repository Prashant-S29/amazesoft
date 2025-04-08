import { redirect } from "next/navigation";
import React from "react";
import { SignupForm } from "~/components/auth/SignUpForm";
import { auth } from "~/server/auth";

// utils
import { generateSeo } from "~/utils";

// components

export const generateMetadata = () =>
  generateSeo({
    title: "Sign Up",
    description:
      "Sign Up to Amaze Soft Technologies - A multivendor marketplace for electronic vendors.",
    url: "/signup",
  });

const SignUp: React.FC = async () => {
  const session = await auth();

  if (session?.user.id) {
    redirect("/");
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default SignUp;
