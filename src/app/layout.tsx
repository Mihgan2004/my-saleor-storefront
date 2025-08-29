// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Tektur, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* =========================
 * Fonts (with Cyrillic)
 * ========================= */
const inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-sans",
	display: "swap",
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const tektur = Tektur({
	subsets: ["latin", "cyrillic"],
	variable: "--font-display", // <— this variable is used by .font-tactical in globals.css
	display: "swap",
	weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin", "cyrillic"],
	variable: "--font-mono",
	display: "swap",
	weight: ["400", "500", "600", "700", "800"],
});

/* =========================
 * Metadata / SEO
 * ========================= */
export const metadata: Metadata = {
	title: {
		default: "GRAYCARDINAL – Tactical Superiority",
		template: "%s | GRAYCARDINAL",
	},
	description: "Urban tactical casual. Sport × Underground × Military. Сила, функция, легенда.",
	keywords: [
		"tactical gear",
		"military equipment",
		"premium clothing",
		"tactical apparel",
		"professional gear",
		"urban wear",
		"tactical accessories",
		"military style",
		"тактическая одежда",
		"городской кэжуал",
	],
	authors: [{ name: "GRAYCARDINAL" }],
	creator: "GRAYCARDINAL",
	publisher: "GRAYCARDINAL",
	metadataBase: new URL("https://graycardinal.com"),
	applicationName: "GRAYCARDINAL",
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	colorScheme: "dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#171A1F" },
		{ media: "(prefers-color-scheme: dark)", color: "#171A1F" },
	],
	openGraph: {
		type: "website",
		locale: "ru_RU",
		alternateLocale: ["en_US"],
		url: "https://graycardinal.com",
		siteName: "GRAYCARDINAL",
		title: "GRAYCARDINAL – Tactical Superiority",
		description: "Urban tactical casual. Sport × Underground × Military. Сила, функция, легенда.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "GRAYCARDINAL Tactical Gear",
				type: "image/jpeg",
			},
			{
				url: "/og-image-square.jpg",
				width: 800,
				height: 800,
				alt: "GRAYCARDINAL Logo",
				type: "image/jpeg",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@graycardinal",
		creator: "@graycardinal",
		title: "GRAYCARDINAL – Tactical Superiority",
		description: "Urban tactical casual. Sport × Underground × Military.",
		images: { url: "/twitter-image.jpg", alt: "GRAYCARDINAL" },
	},
	verification: {
		google: "your-google-site-verification",
	},
	category: "E-commerce",
	classification: "Tactical Gear",
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
		other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#60704A" }],
	},
	manifest: "/site.webmanifest",
};

/* =========================
 * Viewport
 * ========================= */
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: "#171A1F",
	colorScheme: "dark",
};

/* =========================
 * JSON-LD Organization
 * ========================= */
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "GRAYCARDINAL",
	url: "https://graycardinal.com",
	logo: "https://graycardinal.com/logo.png",
	description: "Urban tactical casual. Sport × Underground × Military. Сила, функция, легенда.",
	sameAs: ["https://twitter.com/graycardinal", "https://instagram.com/graycardinal"],
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "customer service",
		availableLanguage: ["Russian", "English"],
	},
};

/* =========================
 * Root Layout
 * ========================= */
interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="ru"
			className={`${inter.variable} ${tektur.variable} ${jetbrainsMono.variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<head>
				{/* Preconnect to Google Fonts for faster font loading */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

				{/* DNS prefetch for analytics (optional) */}
				<link rel="dns-prefetch" href="//www.google-analytics.com" />

				{/* JSON-LD structured data */}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			</head>

			<body
				className="body-surface antialiased"
				style={{
					backgroundColor: "hsl(var(--obsidian))",
					color: "hsl(var(--white))",
				}}
			>
				{/* Skip link for a11y */}
				<a
					href="#main-content"
					className="sr-only z-50 rounded-md bg-olive px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
				>
					К основному контенту
				</a>

				{/* Portal root for modals/overlays */}
				<div id="portal-root" />

				{/* App Shell */}
				<div className="relative flex min-h-screen flex-col">
					<main id="main-content" className="relative z-base flex-1">
						{children}
					</main>
				</div>

				{/* Performance / Preload helper script */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                // Prevent FOUC
                document.documentElement.style.visibility = 'visible';

                // Theme class (if you plan to toggle themes later)
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch(e) {}

                // Preload a few critical hero images (adjust paths to your project)
                var criticalImages = [
                  '/visuals/origin/core-breach.jpg',
                  '/visuals/breach/phantom.jpg',
                  '/visuals/breach/urban.jpg'
                ];
                criticalImages.forEach(function(src) {
                  var link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = 'image';
                  link.href = src;
                  document.head.appendChild(link);
                });
              })();
            `,
					}}
				/>

				{/* Analytics (optional) */}
				{process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID && (
					<>
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
						/>
						<script
							dangerouslySetInnerHTML={{
								__html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href
                  });
                `,
							}}
						/>
					</>
				)}

				{/* Service Worker registration (PWA, optional) */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('SW registered:', reg); })
                    .catch(function(err) { console.log('SW registration failed:', err); });
                });
              }
            `,
					}}
				/>
			</body>
		</html>
	);
}
