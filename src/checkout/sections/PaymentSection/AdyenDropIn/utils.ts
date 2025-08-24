import {
	type AdyenCheckoutInstanceOnAdditionalDetails,
	type AdyenCheckoutInstanceOnSubmit,
	type AdyenGatewayInitializePayload,
	type DropinElement,
	type AdyenCheckoutInstanceState,
} from "./types";

// Тип конфига, который ждёт AdyenCheckout(..)
// Нам не нужны внутренние типы SDK — описываем лишь то, что реально используем.
type CoreOptions = {
	environment: string;
	clientKey: string;
	locale?: string;
	amount?: { value: number; currency: string };
	paymentMethodsResponse: unknown;
	analytics?: { enabled: boolean };
	onSubmit?: (state: AdyenCheckoutInstanceState, component: DropinElement) => void | Promise<void>;
	onAdditionalDetails?: (state: AdyenCheckoutInstanceState, component: DropinElement) => void | Promise<void>;
};

export function createAdyenCheckoutConfig(
	payload: AdyenGatewayInitializePayload & {
		onSubmit?: AdyenCheckoutInstanceOnSubmit;
		onAdditionalDetails?: AdyenCheckoutInstanceOnAdditionalDetails;
	},
): CoreOptions {
	const { clientKey, environment, locale, amount, paymentMethodsResponse, onSubmit, onAdditionalDetails } =
		payload;

	return {
		clientKey,
		environment,
		locale,
		amount,
		paymentMethodsResponse,
		analytics: { enabled: true },
		// оборачиваем чтобы не тянуть типы из SDK
		onSubmit: (state, component) => onSubmit?.(state, component),
		onAdditionalDetails: (state, component) => onAdditionalDetails?.(state, component),
	};
}
