// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/**
 * Цветовые хелперы.
 * hsl() — для theme.colors (Tailwind сам подставляет альфу через <alpha-value>)
 * hsla() — для plugin(addUtilities) и любых «готовых» CSS-значений, где нужна конкретная альфа
 */
const hsl = (v: string) => `hsl(var(${v}) / <alpha-value>)`;
const hsla = (v: string, a: number | string = 1) => `hsl(var(${v}) / ${a})`;

const config: Config = {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	safelist: [
		// Цветовые утилиты (на всякий случай для динамики классов)
		"text-crimson",
		"text-olive",
		"text-steel",
		"text-emerald",
		"text-amber",
		"text-white",
		"text-silver",
		"bg-crimson",
		"bg-olive",
		"bg-steel",
		"bg-obsidian",
		"bg-charcoal",
		"bg-graphite",
		"bg-zinc",
		"bg-slate",
		"bg-crimson/20",
		"bg-olive/20",
		"border-crimson",
		"border-olive",
		"border-zinc",
		"border-slate",
		// Задержки анимаций (стаггеры)
		"stagger-delay-75",
		"stagger-delay-100",
		"stagger-delay-150",
		"stagger-delay-200",
		"stagger-delay-300",
	],
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
			screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1400px" },
		},
		extend: {
			// ===== Цвета темы (из CSS vars) =====
			colors: {
				// Base / Surfaces
				obsidian: { DEFAULT: hsl("--obsidian"), fg: hsl("--white") }, // #0B0D10
				charcoal: hsl("--charcoal"), // #111317
				graphite: hsl("--graphite"), // #181B20

				// Borders / Muted
				zinc: hsl("--zinc"), // #2A2E36
				slate: hsl("--slate"), // #3A404A

				// Text
				white: hsl("--white"),
				silver: hsl("--silver"),

				// Brand
				crimson: {
					DEFAULT: hsl("--crimson"), // #C0162C
					hover: hsl("--crimson-hover"), // #D21F37
					soft: hsl("--crimson-soft"),
					fg: hsl("--white"),
				},
				olive: {
					DEFAULT: hsl("--olive"), // #60704A
					hover: hsl("--olive-hover"), // #6E7E54
					soft: hsl("--olive-soft"),
					fg: hsl("--white"),
				},
				steel: {
					DEFAULT: hsl("--steel"), // #4F5B66
					soft: hsl("--steel-soft"),
					fg: hsl("--white"),
				},

				// Status
				emerald: hsl("--emerald"), // #2EA56A
				amber: hsl("--amber"), // #D29C1E

				// Legacy alias
				fortress: { DEFAULT: hsl("--obsidian"), fg: hsl("--white") },
				shadow: { DEFAULT: hsl("--zinc"), light: hsl("--slate"), dark: hsl("--charcoal") },
			},

			// ===== Шрифты =====
			fontFamily: {
				sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
				tactical: ["var(--font-display)", "var(--font-sans)", ...defaultTheme.fontFamily.sans],
				mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],

				// Навигация/бренд теперь на Tektur
				nav: ["var(--font-tektur)", "var(--font-sans)", ...defaultTheme.fontFamily.sans],
				brand: ["var(--font-tektur)", "var(--font-sans)", ...defaultTheme.fontFamily.sans],
			},

			fontSize: {
				"2xs": ["0.65rem", { lineHeight: "1", letterSpacing: "0.05em" }],
				xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.025em" }],
				sm: ["1rem", { lineHeight: "1.4" }],
				base: ["1rem", { lineHeight: "1.6" }],
				lg: ["1.125rem", { lineHeight: "1.6" }],
				xl: ["1.25rem", { lineHeight: "1.6" }],
				"2xl": ["1.5rem", { lineHeight: "1.4" }],
				"3xl": ["1.875rem", { lineHeight: "1.3" }],
				"4xl": ["2.25rem", { lineHeight: "1.2" }],
				"5xl": ["3rem", { lineHeight: "1.1" }],
				"6xl": ["3.75rem", { lineHeight: "1" }],
				"7xl": ["4.5rem", { lineHeight: "1" }],
				"8xl": ["6rem", { lineHeight: "1" }],
				"9xl": ["8rem", { lineHeight: "1" }],
			},

			spacing: { 18: "4.5rem", 88: "22rem", 128: "32rem" },

			borderRadius: {
				xs: "0.25rem",
				sm: "0.375rem",
				DEFAULT: "0.5rem",
				md: "0.5rem",
				lg: "0.75rem",
				xl: "1rem",
				"2xl": "1.25rem",
				"3xl": "1.5rem",
			},

			// ===== Тактические тени/свечения =====
			boxShadow: {
				"tactical-sm": "0 2px 8px hsl(0 0% 0% / 0.40), 0 1px 3px hsl(0 0% 0% / 0.20)",
				tactical: "0 4px 16px hsl(0 0% 0% / 0.40), 0 1px 4px hsl(0 0% 0% / 0.20)",
				"tactical-lg": "0 8px 32px hsl(0 0% 0% / 0.50), 0 2px 8px hsl(0 0% 0% / 0.25)",
				"tactical-xl": "0 16px 64px hsl(0 0% 0% / 0.60), 0 4px 16px hsl(0 0% 0% / 0.30)",
				"glow-crimson": "0 0 24px hsl(var(--crimson) / 0.35)",
				"glow-olive": "0 0 18px hsl(var(--olive) / 0.30)",
				"glow-steel": "0 0 16px hsl(var(--steel) / 0.25)",
			},

			// ===== Градиенты и паттерны =====
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

				// Используем hsla() (без <alpha-value>)
				"tactical-crimson": `linear-gradient(135deg, ${hsla("--crimson")}, ${hsla("--crimson-hover")})`,
				"tactical-olive": `linear-gradient(135deg, ${hsla("--olive")}, ${hsla("--olive-hover")})`,
				"tactical-mixed": `linear-gradient(135deg, ${hsla("--crimson")}, ${hsla("--olive")})`,

				"tactical-grid":
					"linear-gradient(hsl(var(--zinc) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--zinc) / 0.35) 1px, transparent 1px)",
				"tactical-dots": "radial-gradient(hsl(var(--zinc) / 0.30) 1px, transparent 1px)",
				"obsidian-texture": `radial-gradient(800px at 25% 20%, hsl(var(--crimson-soft) / 0.12), transparent 60%),
           radial-gradient(600px at 75% 80%, hsl(var(--olive-soft) / 0.08), transparent 70%),
           radial-gradient(400px at 50% 50%, hsl(var(--steel-soft) / 0.06), transparent 80%)`,
			},
			backgroundSize: { grid: "32px 32px", dots: "24px 24px", texture: "100% 100%" },

			// ===== Тайминги, уровни, экраны =====
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				tactical: "cubic-bezier(0.4, 0, 0.2, 1)",
				"tactical-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			},
			// чтобы delay-300/500/700/1000 были доступны как стандартные классы
			transitionDelay: {
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1000: "1000ms",
			},
			zIndex: { hide: "-1", base: "0", elevated: "10", fixed: "100", overlay: "1000", modal: "10000" },
			screens: { xs: "475px", ...defaultTheme.screens, "3xl": "1600px" },

			// ===== Доп. значения =====
			opacity: { 2: "0.02", 3: "0.03", 12: "0.12", 15: "0.15", 35: "0.35", 85: "0.85" },
			blur: { xs: "2px", "4xl": "72px" },

			// ===== Анимации =====
			keyframes: {
				"fade-in": {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in-right": {
					from: { opacity: "0", transform: "translateX(-20px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				"tactical-glow": {
					"0%,100%": { boxShadow: "0 0 15px hsl(var(--crimson) / 0.20)" },
					"50%": { boxShadow: "0 0 28px hsl(var(--crimson) / 0.40), 0 0 38px hsl(var(--crimson) / 0.20)" },
				},
				"tactical-pulse": {
					"0%,100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.85", transform: "scale(1.02)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.6s ease-out both",
				"slide-in-right": "slide-in-right 0.6s ease-out both",
				"tactical-glow": "tactical-glow 2s ease-in-out infinite",
				"tactical-pulse": "tactical-pulse 1.8s ease-in-out infinite",
			},
		},
	},

	plugins: [
		// 1) Stagger delays: .stagger-delay-150 { animation-delay: 150ms }
		plugin(({ addUtilities, theme }) => {
			const delays = theme("transitionDelay");

			const source: Record<string, string> = delays ?? {
				"75": "75ms",
				"100": "100ms",
				"150": "150ms",
				"200": "200ms",
				"300": "300ms",
				"500": "500ms",
				"700": "700ms",
				"1000": "1000ms",
			};

			const utils: Record<string, { animationDelay: string }> = {};
			Object.entries(source).forEach(([k, v]) => {
				utils[`.stagger-delay-${k}`] = { animationDelay: v };
			});

			addUtilities(utils);
		}),

		// 2) Тактический focus-visible
		plugin(({ addUtilities }) => {
			addUtilities({
				".focus-visible": {
					"&:focus-visible": {
						outline: `2px solid ${hsla("--crimson", 1)}`,
						"outline-offset": "2px",
						"border-radius": "0.375rem",
						"box-shadow": `0 0 0 4px ${hsla("--crimson", 0.2)}`,
					},
				},
			});
		}),

		// 3) Текстовые тени/свечения
		plugin(({ addUtilities }) => {
			addUtilities({
				".text-shadow-sm": { "text-shadow": "0 1px 2px hsl(0 0% 0% / 0.6)" },
				".text-shadow": { "text-shadow": "0 2px 4px hsl(0 0% 0% / 0.8)" },
				".text-shadow-lg": { "text-shadow": "0 4px 8px hsl(0 0% 0% / 0.9)" },
				".text-shadow-tactical": {
					"text-shadow": "0 2px 8px hsl(0 0% 0% / 0.8), 0 0 16px hsl(0 0% 0% / 0.4)",
				},

				".text-glow-crimson": {
					"text-shadow": `0 0 10px ${hsla("--crimson", 1)}, 0 0 20px ${hsla("--crimson", 0.5)}`,
				},
				".text-glow-olive": {
					"text-shadow": `0 0 10px ${hsla("--olive", 1)}, 0 0 16px ${hsla("--olive", 0.4)}`,
				},
				".text-glow-white": { "text-shadow": "0 0 8px hsl(0 0% 100% / 0.8)" },

				".hover-glow-crimson": {
					transition: "all .3s ease",
					"&:hover": {
						"text-shadow": `0 0 12px ${hsla("--crimson", 1)}, 0 0 24px ${hsla("--crimson", 0.6)}`,
						transform: "translateY(-1px)",
					},
				},
			});
		}),

		// 4) Бордеры/карточки/бэкдропы
		plugin(({ addUtilities }) => {
			addUtilities({
				".border-tactical": {
					border: `1px solid ${hsla("--zinc")}`,
					background: `linear-gradient(${hsla("--charcoal")}, ${hsla("--graphite")})`,
				},
				".border-tactical-glow": {
					border: `1px solid ${hsla("--crimson", 0.3)}`,
					"box-shadow": `0 0 0 1px ${hsla("--crimson", 0.1)}, inset 0 1px 0 hsl(0 0% 100% / 0.05)`,
				},
				".border-tactical-active": {
					border: `1px solid ${hsla("--crimson", 0.6)}`,
					"box-shadow": `0 0 0 2px ${hsla("--crimson", 0.2)}, inset 0 1px 0 hsl(0 0% 100% / 0.10)`,
				},

				".tactical-surface": {
					background: hsla("--obsidian"),
					color: hsla("--white"),
					position: "relative",
					isolation: "isolate",
				},
				".tactical-surface::before": {
					content: "''",
					position: "absolute",
					inset: "0",
					background: "var(--tw-gradient-to, var(--obsidian-texture))",
					zIndex: "-1",
					pointerEvents: "none",
				},
				".tactical-card": {
					background: hsla("--charcoal"),
					border: `1px solid ${hsla("--zinc")}`,
					"border-radius": "0.75rem",
					"box-shadow": "0 4px 16px hsl(0 0% 0% / 0.40), 0 1px 4px hsl(0 0% 0% / 0.20)",
					transition: "all .3s ease",
				},
				".tactical-card:hover": {
					transform: "translateY(-2px)",
					"border-color": hsla("--slate"),
					"box-shadow": "0 8px 32px hsl(0 0% 0% / 0.50), 0 2px 8px hsl(0 0% 0% / 0.25)",
				},

				".backdrop-tactical": {
					"backdrop-filter": "blur(16px) saturate(180%)",
					background: hsla("--obsidian", 0.85),
				},
				".backdrop-tactical-dark": {
					"backdrop-filter": "blur(20px) saturate(160%)",
					background: hsla("--charcoal", 0.9),
				},
			});
		}),
	],
};

export default config;
