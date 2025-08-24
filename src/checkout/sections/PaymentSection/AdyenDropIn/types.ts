export type AdyenGatewayInitializePayload = {
	environment: string;
	clientKey: string;
	locale?: string;
	countryCode?: string;
	amount?: { value: number; currency: string };
	paymentMethodsResponse?: unknown;
	onSubmitUrl?: string;
	onAdditionalDetailsUrl?: string;
	[key: string]: unknown;
};

export type AdyenCheckoutInstanceState = {
	isValid?: boolean;
	data: Record<string, unknown>;
};

export interface AdyenComponentLike {
	mount: (container: HTMLElement | string) => unknown;
	unmount?: () => void;
	submit?: () => void;
	handleAction?: (action: unknown) => void;
	setStatus?: (status: "loading" | "success" | "error" | "ready", data?: unknown) => void;
}

export type AdyenCallbacks = {
	onSubmit: (state: AdyenCheckoutInstanceState, component: AdyenComponentLike) => void | Promise<void>;
	onAdditionalDetails: (
		state: AdyenCheckoutInstanceState,
		component: AdyenComponentLike,
	) => void | Promise<void>;
};
