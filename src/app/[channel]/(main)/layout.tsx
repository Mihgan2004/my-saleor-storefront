import type { ReactNode } from "react";
import Header from "@/ui/components/Header";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	// params — Promise в Next 14.2+/15
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await params; // ✅ главное — дождаться

	return (
		<>
			<Header channel={channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{children}</main>
			</div>
		</>
	);
}
