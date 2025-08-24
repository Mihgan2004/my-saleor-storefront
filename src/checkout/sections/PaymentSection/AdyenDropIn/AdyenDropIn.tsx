import "@adyen/adyen-web/dist/adyen.css";
import { type FC, useCallback, useEffect, useRef } from "react";

import {
	type AdyenDropinProps,
	useAdyenDropin,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/useAdyenDropin";

import {
	createAdyenCheckoutInstance as buildAdyenCheckout,
	type AdyenDropInCreateSessionResponse,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/createAdyenCheckout";

/**
 * Узкий тип для dropin — нам нужен только unmount.
 */
type DropinElement = { unmount?: () => void };

/**
 * Type guard: проверяем, что в data действительно лежит payload сессии Adyen.
 */
function isAdyenSessionPayload(x: unknown): x is AdyenDropInCreateSessionResponse {
	if (!x || typeof x !== "object") return false;
	const s = (x as { session?: unknown }).session as { id?: unknown; sessionData?: unknown } | undefined;
	return !!(s && typeof s.id === "string" && typeof s.sessionData === "string");
}

export const AdyenDropIn: FC<AdyenDropinProps> = ({ config }) => {
	const { onSubmit, onAdditionalDetails } = useAdyenDropin({ config });

	const containerRef = useRef<HTMLDivElement>(null);
	const dropinRef = useRef<DropinElement | null>(null);

	const initAdyen = useCallback(
		async (container: HTMLDivElement, data: unknown) => {
			if (!isAdyenSessionPayload(data)) {
				// нет session-пейлоада — ничего не делаем
				return;
			}

			const adyenCheckout = await buildAdyenCheckout(data, {
				onSubmit,
				onAdditionalDetails,
			});

			// Перемонтируем, если уже был
			dropinRef.current?.unmount?.();

			const dropin = adyenCheckout.create("dropin").mount(container);
			dropinRef.current = dropin as unknown as DropinElement;
		},
		[onAdditionalDetails, onSubmit],
	);

	useEffect(() => {
		if (containerRef.current && !dropinRef.current) {
			void initAdyen(containerRef.current, config?.data);
		}
	}, [config?.data, initAdyen]);

	return <div ref={containerRef} />;
};
