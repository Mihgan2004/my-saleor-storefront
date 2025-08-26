/// FILE: src/ui/longread/analytics.ts
"use client";

declare global {
	interface Window {
		dataLayer?: Array<Record<string, any>>;
	}
}

export function track(event: string, payload?: Record<string, any>): void {
	if (typeof window === "undefined") return;

	// Инициализируем dataLayer если не существует
	if (!window.dataLayer) {
		window.dataLayer = [];
	}

	// Пушим событие в dataLayer
	window.dataLayer.push({
		event,
		timestamp: Date.now(),
		...payload,
	});

	// В development логируем в консоль
	if (process.env.NODE_ENV === "development") {
		console.log("[Analytics]", event, payload);
	}
}
