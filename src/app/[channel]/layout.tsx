// src/app/[channel]/layout.tsx
import { type ReactNode } from "react";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument } from "@/gql/graphql";

export async function generateStaticParams() {
  if (process.env.SALEOR_APP_TOKEN) {
    const { channels } = await executeGraphQL(ChannelsListDocument, {
      withAuth: false,
      headers: { Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}` },
    });
    return (
      channels?.filter((c) => c.isActive).map((c) => ({ channel: c.slug })) ?? []
    );
  }
  // когда нет токена – только дефолтный канал
  return [{ channel: process.env.NEXT_PUBLIC_DEFAULT_CHANNEL ?? "default-channel" }];
}

export default function ChannelLayout({ children }: { children: ReactNode }) {
  return children;
}

