"use client";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

// Next Auth
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
// import { PageLoader } from "~/components/common/PageLoader";
import { useMounted } from "~/hooks";
import Link from "next/link";
import { UserSignupSchema } from "~/schema/user/schema.usersignup";

// data
import { defaultValues } from "./config";
import { useState } from "react";
import { EveHidden, EyeVisible } from "~/icons";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

// Form data type inferred from Zod schema
type UserSignupFormValues = z.infer<typeof UserSignupSchema>;

export const SignupForm: React.FC = () => {
  const { status } = useSession();
  const mounted = useMounted();

  const router = useRouter();

  const form = useForm<UserSignupFormValues>({
    resolver: zodResolver(UserSignupSchema),
    defaultValues,
  });

  // states
  const [showPassword, setShowPassword] = useState(false);

  // mutations
  const userSignupMutation = api.user.signup.useMutation();

  const onSubmit = async (data: UserSignupFormValues) => {
    console.log(data);

    // signup the user
    const res = await userSignupMutation.mutateAsync(data);

    if (!res.data?.id) {
      toast.error(res.message);
      form.reset(defaultValues);
      return;
    }

    // now login the user
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(res);

      if (!res?.ok) {
        toast.info("Please login manually");
        router.push("/login");
        return;
      }
      toast.success("Congrats, you are onboarded!");
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      toast.info("Please login manually");
      router.push("/login");
    }
  };

  if (!mounted)
    // TODO: render some ui here
    return null;

  return (
    <>
      {status === "loading" ? (
        // <PageLoader />
        <p>Loading...</p>
      ) : (
        <Card className="w-full max-w-[350px]">
          <CardHeader>
            <CardTitle className="text-md">Sign Up</CardTitle>
            <CardDescription className="-mt-2">
              Let&apos;s get you onboarded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Name"
                            disabled={form.formState.isSubmitting}
                            autoComplete="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Email"
                            disabled={form.formState.isSubmitting}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              disabled={form.formState.isSubmitting}
                              autoComplete="current-password"
                            />
                            <Button
                              variant="ghost"
                              type="button"
                              size="icon"
                              tabIndex={-1}
                              className="absolute top-1/2 right-0 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={form.formState.isSubmitting}
                            >
                              {showPassword ? <EyeVisible /> : <EveHidden />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    loading={form.formState.isSubmitting}
                    type="submit"
                    size="sm"
                    className="mt-2 w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Signup
                  </Button>

                  {/* <Button
                    type="button"
                    className="w-full text-black"
                    variant="link"
                    disabled={form.formState.isSubmitting}
                    asChild
                  >
                    <Link href="/">back to home</Link>
                  </Button> */}
                </div>

                <p className="mt-2 text-center text-xs">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-2">
                    Login
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};
