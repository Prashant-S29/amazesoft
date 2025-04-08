import React from "react";

// utils
import { generateSeo } from "~/utils";

// components
import { LoginForm } from "~/components/auth/LoginForm";

export const generateMetadata = () =>
  generateSeo({
    title: "Login",
    description:
      "Login to Amaze Soft Technologies - A multivendor marketplace for electronic vendors.",
    url: "/login",
  });

const Login: React.FC = async () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;
