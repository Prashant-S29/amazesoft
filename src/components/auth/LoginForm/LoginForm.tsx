"use client";

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
import {
  UserLoginSchema,
  type UserLoginSchemaFormValues,
} from "~/schema/user/schema.userlogin";

// data
import { defaultValues } from "./config.loginForm";
import { useState } from "react";
import { EveHidden, EyeVisible } from "~/icons";
import { useRouter } from "next/navigation";

// Form data type inferred from Zod schema

export const LoginForm: React.FC = () => {
  const { status, data } = useSession();
  const mounted = useMounted();
  const router = useRouter();

  // states
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserLoginSchemaFormValues>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues,
  });

  if (data?.user?.id) {
    router.push("/");
  }

  const onSubmit = async (data: UserLoginSchemaFormValues) => {
    console.log(data);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(res);

      if (!res?.ok || res.error) {
        toast.error("Invalid credentials");
        return;
      }
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      toast.info("Please login manually");

      return;
      // router.push("/login");
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
            <CardTitle className="text-md">Login</CardTitle>
            <CardDescription className="-mt-2">
              Let&apos;s continue where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
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
                    Login
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

                <p className="text-primary/50 mt-2 text-center text-xs">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-2">
                    Signup
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
