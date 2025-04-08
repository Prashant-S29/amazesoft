import React from "react";

// utils
import { generateSeo } from "~/utils";
import { JoinAsAVendorPage } from "./JoinAsVendorPage";

// Metadata
export const generateMetadata = () =>
  generateSeo({
    title: "Join as a Vendor",
    description: "A multivendor marketplace for electronic vendors.",
    url: "/vendor/join",
  });

interface Props {
  searchParams: Promise<{
    tokenId: string;
  }>;
}

const JoinAsAVendor: React.FC<Props> = async ({ searchParams }) => {
  const tokenId = (await searchParams).tokenId;

  return <JoinAsAVendorPage tokenId={tokenId} />;
};

export default JoinAsAVendor;
