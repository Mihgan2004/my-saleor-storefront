import type { ReactNode } from "react";
import Header from "@/ui/components/Header";
import { Footer } from "@/ui/components/Footer";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout({
	children,
	params: { channel },
}: {
	children: ReactNode;
	params: { channel: string };
}) {
	return (
		<>
			<Header channel={channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{children}</main>
				<Footer channel={channel} />
			</div>
		</>
	);
}
