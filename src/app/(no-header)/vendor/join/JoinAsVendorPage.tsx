"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

// icons
import { CheckboxCircleIcon, CloseCircleIcon, LoadingIcon } from "~/icons";

// components
import { toast } from "sonner";
import { api } from "~/trpc/react";
// import { signIn } from "~/server/auth";
import { useSession } from "next-auth/react";
import { signInVendor } from "~/utils/actions/auth-actions";

type VerificationState =
  | "verified"
  | "expired"
  | "error"
  | "loading"
  | "brokenLink";

interface Props {
  tokenId: string;
}

export const JoinAsAVendorPage: React.FC<Props> = ({ tokenId }) => {
  const router = useRouter();
  const session = useSession();

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);

    if (session?.data?.user.id) {
      setPageLoading(false);
      router.push("/dashboard");
      return;
    }
    setPageLoading(false);
  }, [router, session?.data?.user.id]);

  // states
  const [state, setVerificationState] = useState<VerificationState>("loading");
  const [isSettingAccLoading, setIsSettingAccLoading] = useState(false);
  const activeInstance = useRef(false);

  // mutations
  const verifyInvitationMutation =
    api.token.handleVendorInvitationToken.useMutation();

  const acceptInvitationMutation = api.vendor.acceptInvitation.useMutation();

  const verifyToken = useCallback(async () => {
    const redirectToHome = () => {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    };

    try {
      if (activeInstance.current) {
        return;
      }

      activeInstance.current = true;

      // if no token id
      if (!tokenId) {
        setVerificationState("brokenLink");
        // router.push("/");
        redirectToHome();

        return;
      }

      // verify the token on server
      const tokenVerificationRes = await verifyInvitationMutation.mutateAsync({
        tokenId,
      });

      if (
        !tokenVerificationRes.data?.email ||
        !tokenVerificationRes.data?.isTokenValid
      ) {
        setVerificationState("error");
        toast.error(tokenVerificationRes.message);
        // router.push("/");
        redirectToHome();

        return;
      }

      setIsSettingAccLoading(true);
      setVerificationState("verified");

      // accept invitation
      const acceptInvitationRes = await acceptInvitationMutation.mutateAsync({
        mail: tokenVerificationRes.data.email,
      });

      if (!acceptInvitationRes.data) {
        toast.error(acceptInvitationRes.message);
        // router.push("/");
        redirectToHome();

        return;
      }

      // signin the vendor

      await signInVendor({
        email: tokenVerificationRes.data.email,
        password: tokenVerificationRes.data.password,
      });

      // await signIn("credentials", {
      //   email: tokenVerificationRes.data.email,
      //   password: null,
      //   redirect: false,
      // });

      // if (!res?.ok || res.error) {
      //   toast.error("unexpected error");
      //   return;
      // }

      setIsSettingAccLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationState("error");
      toast.error("Verification failed");
      router.push("/");
    }
  }, [tokenId, verifyInvitationMutation, acceptInvitationMutation, router]);

  useEffect(() => {
    void verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageLoading) {
    return (
      <main className="bg-accent flex h-screen w-full items-center justify-center">
        <p>loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-accent flex h-screen w-full items-center justify-center">
      <VerifyInvitationBox
        state={state}
        isSettingAccLoading={isSettingAccLoading}
      />
    </main>
  );
};

interface VerifyInvitationProps {
  state: VerificationState;
  isSettingAccLoading: boolean;
}

const VerifyInvitationBox: React.FC<VerifyInvitationProps> = ({
  state,
  isSettingAccLoading,
}) => {
  const getMessage = () => {
    switch (state) {
      case "loading":
        return {
          title: (
            <h1 className="flex items-center gap-1 text-xs font-medium">
              <div className="animate-spin">
                <LoadingIcon className="text-[14px]" />
              </div>
              Loading your invitation....
            </h1>
          ),
          description: (
            <p className="text-primary/70 mt-1 text-xs">
              Invitation in progress. This won&apos;t take long.
            </p>
          ),
        };
      case "error":
        return {
          title: (
            <h1 className="flex items-center gap-1 text-sm font-medium">
              <CloseCircleIcon className="text-base text-red-600" />
              Invitation failed
            </h1>
          ),
          description: (
            <p className="text-primary/70 mt-1 text-xs">
              We are unable to create your account. Please try again. If the
              problem persists, please contact us at{" "}
              <Link
                href="mailto:support@amazesoft.com"
                className="text-primary font-medium underline"
              >
                support@amazesoft.com
              </Link>
              .
            </p>
          ),
        };
      case "brokenLink":
        return {
          title: (
            <h1 className="flex items-center gap-1 text-sm font-medium">
              <CloseCircleIcon className="text-base text-red-600" />
              Invitation link broken
            </h1>
          ),
          description: (
            <p className="text-primary/70 mt-1 text-xs">
              We are unable to get the invitation link. Please check the link
              you received on mail and try again.
            </p>
          ),
        };
      case "expired":
        return {
          title: (
            <h1 className="flex items-center gap-1 text-sm font-medium">
              <CloseCircleIcon className="text-base text-red-600" />
              Invitation link expired
            </h1>
          ),
          description: (
            <p className="text-primary/70 mt-1 text-xs">
              Seems like your Invitation link has expired. Please ask for a new
              invitation request. If the problem persists, please contact us at{" "}
              <Link
                href="mailto:support@amazesoft.com"
                className="text-primary font-medium underline"
              >
                support@amazesoft.com
              </Link>
              .
            </p>
          ),
        };
      case "verified":
        return {
          title: (
            <h1 className="flex items-center gap-1 text-sm font-medium">
              <CheckboxCircleIcon className="text-base text-green-600" />
              Invitation Successful
            </h1>
          ),
          description: (
            <p className="text-primary/70 mt-1 text-xs">
              We have successfully created your account. We are now setting up
              your dashboard.
            </p>
          ),
        };
      default:
        return { title: null, description: null };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="w-[400px] rounded-lg border bg-white px-4 py-3">
      <div>
        {title}
        {description}

        {state !== "loading" && state !== "verified" && (
          <>
            <div className="bg-border my-3 h-[0.5px] w-full" />
            <h1 className="flex items-center gap-1 text-xs">
              <div className="animate-spin">
                <LoadingIcon className="text-[14px]" />
              </div>
              redirecting...
            </h1>
          </>
        )}

        {isSettingAccLoading && (
          <>
            <div className="bg-border my-3 h-[0.5px] w-full" />
            <h1 className="flex items-center gap-1 text-xs">
              <div className="animate-spin">
                <LoadingIcon className="text-[14px]" />
              </div>
              redirecting...
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
