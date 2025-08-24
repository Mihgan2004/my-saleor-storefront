import {
	type AdyenCheckoutInstanceOnAdditionalDetails,
	type AdyenCheckoutInstanceOnSubmit,
	type AdyenGatewayInitializePayload,
} from "./types";

export type AdyenDropinProps = {
	config: { data: AdyenGatewayInitializePayload };
};

// Хук только пробрасывает обработчики из конфига.
// Никаких внутренних импортов из @adyen/adyen-web/dist/**
export function useAdyenDropin({ config }: { config: { data: AdyenGatewayInitializePayload } }): {
	onSubmit: AdyenCheckoutInstanceOnSubmit;
	onAdditionalDetails: AdyenCheckoutInstanceOnAdditionalDetails;
} {
	const onSubmit: AdyenCheckoutInstanceOnSubmit = async (state, component) => {
		// если потребуются свои действия — добавите здесь
		if (config.data.onSubmit) {
			return config.data.onSubmit(state, component);
		}
	};

	const onAdditionalDetails: AdyenCheckoutInstanceOnAdditionalDetails = async (state, component) => {
		if (config.data.onAdditionalDetails) {
			return config.data.onAdditionalDetails(state, component);
		}
	};

	return { onSubmit, onAdditionalDetails };
}
