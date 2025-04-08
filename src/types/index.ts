export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  domain: string;
  ogImage: {
    url: string;
    width: number;
    height: number;
  };
  twitterHandle: string;
  links: {
    twitter: string;
  };
};

export type TokenPayload<T> = {
  data: T;
  exp?: number;
};

export type VendorInvitationMailProps = {
  senderMail: string;
  senderName: string;
  invitationLink: string;
};
