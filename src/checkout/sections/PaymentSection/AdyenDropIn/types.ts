// Лёгкие, устойчивые к апгрейдам типы для Drop-in

// что возвращает Adyen при onSubmit/onAdditionalDetails
export type AdyenCheckoutInstanceState = {
	isValid: boolean;
	// набор полей зависит от способа оплаты — держим как словарь
	data: Record<string, unknown>;
};

// минимальный «интерфейс» инстанса компонента.
// Нам важно уметь setStatus/unmount, остальное опционально.
export type DropinElement = {
	unmount: () => void;
	setStatus?: (status: string, opts?: Record<string, unknown>) => void;
	submit?: () => void;
};

// коллбеки Drop-in
export type AdyenCheckoutInstanceOnSubmit = (
	state: AdyenCheckoutInstanceState,
	component: DropinElement,
) => void | Promise<void>;

export type AdyenCheckoutInstanceOnAdditionalDetails = (
	state: AdyenCheckoutInstanceState,
	component: DropinElement,
) => void | Promise<void>;

// полезный алиас под ApplePay (оставил, если используется где-то ещё)
export type ApplePayCallback<T = unknown> = (value: T) => void;

// то, чем инициализируем виджет с бэкенда
export type AdyenGatewayInitializePayload = {
	clientKey: string;
	environment: string; // 'test' | 'live' | кастомный
	locale?: string;
	amount?: { value: number; currency: string };
	paymentMethodsResponse: unknown;

	// пробрасываем обработчики
	onSubmit?: AdyenCheckoutInstanceOnSubmit;
	onAdditionalDetails?: AdyenCheckoutInstanceOnAdditionalDetails;
};
