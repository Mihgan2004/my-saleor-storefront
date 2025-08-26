// src/app/page.tsx
import { redirect } from "next/navigation";

const DEFAULT_CHANNEL =
  process.env.NEXT_PUBLIC_DEFAULT_CHANNEL ?? "default-channel";

export default function RootRedirect() {
  redirect(`/${DEFAULT_CHANNEL}`); // редиректит ТОЛЬКО с "/" на "/<channel>"
}
