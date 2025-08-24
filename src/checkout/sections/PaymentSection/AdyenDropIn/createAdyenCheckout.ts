// src/checkout/sections/PaymentSection/AdyenDropIn/createAdyenCheckout.ts

import AdyenCheckout from "@adyen/adyen-web";
import { PaymentResponse as AdyenApiPaymentResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentResponse";
import { type CreateCheckoutSessionResponse } from "@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse";
import {
	type AdyenCheckoutInstanceOnAdditionalDetails,
	type AdyenCheckoutInstanceOnSubmit,
	type AdyenCheckoutInstanceState,
	type DropinElement,
} from "./types";
import { replaceUrl } from "@/checkout/lib/utils/url";

// Берём стабильные типы из api-library только для результата платежа

export type AdyenDropInCreateSessionResponse = {
	session: CreateCheckoutSessionResponse;
	clientKey?: string;
};

export type PostAdyenDropInPaymentsResponse = {
	payment: AdyenApiPaymentResponse;
	orderId: string;
};

export type PostAdyenDropInPaymentsDetailsResponse = {
	payment: AdyenApiPaymentResponse;
	orderId: string;
};

// вспомогательные типы для Apple Pay (без внутренних импортов SDK)
type ApplePayResolve = (value: unknown) => void;
type ApplePayEvent = {
	paymentMethod?: unknown;
	shippingContact?: unknown;
	shippingMethod?: unknown;
};

/**
 * Создаёт инстанс AdyenCheckout (session-интеграция).
 * Никаких внутренних типов SDK, только приведение к типу параметра функции.
 */
export function createAdyenCheckoutInstance(
	adyenSessionResponse: AdyenDropInCreateSessionResponse,
	{
		onSubmit,
		onAdditionalDetails,
	}: {
		onSubmit: AdyenCheckoutInstanceOnSubmit;
		onAdditionalDetails: AdyenCheckoutInstanceOnAdditionalDetails;
	},
) {
	const opts = {
		locale: "en-US",
		environment: "test",
		// clientKey обязателен в web-SDK; если он есть — пробрасываем
		clientKey: adyenSessionResponse.clientKey,
		session: {
			id: adyenSessionResponse.session.id,
			sessionData: adyenSessionResponse.session.sessionData,
		},
		onPaymentCompleted: (result: unknown, component: unknown) => {
			// можете добавить свою телеметрию/логирование
			console.info(result, component);
		},
		onError: (error: unknown, component: unknown) => {
			const e = error as { name?: string; message?: string; stack?: string };
			console.error(e?.name ?? "AdyenError", e?.message, e?.stack, component);
		},
		onSubmit: (state: AdyenCheckoutInstanceState, component: DropinElement) => onSubmit(state, component),
		onAdditionalDetails: (state: AdyenCheckoutInstanceState, component: DropinElement) =>
			onAdditionalDetails(state, component),
		paymentMethodsConfiguration: {
			card: {
				hasHolderName: true,
				holderNameRequired: true,
				billingAddressRequired: false,
			},
			applepay: {
				buttonType: "plain",
				buttonColor: "black",
				onPaymentMethodSelected: (resolve: ApplePayResolve, _reject: ApplePayResolve, event: ApplePayEvent) =>
					resolve(event.paymentMethod),
				onShippingContactSelected: (
					resolve: ApplePayResolve,
					_reject: ApplePayResolve,
					event: ApplePayEvent,
				) => resolve(event.shippingContact),
				onShippingMethodSelected: (
					resolve: ApplePayResolve,
					_reject: ApplePayResolve,
					event: ApplePayEvent,
				) => resolve(event.shippingMethod),
			},
		},
		analytics: { enabled: false },
	};

	// Ключевой трюк: приводим объект к типу 1-го параметра AdyenCheckout,
	// не импортируя внутренние типы SDK и не споря о несовпадении generic-ов.
	return AdyenCheckout(opts as Parameters<typeof AdyenCheckout>[0]);
}

/**
 * Унифицированная обработка результата платежа.
 */
export function handlePaymentResult(
	saleorApiUrl: string,
	result: PostAdyenDropInPaymentsResponse | PostAdyenDropInPaymentsDetailsResponse,
	component: DropinElement,
) {
	switch (result.payment.resultCode) {
		// @todo при необходимости расширьте обработку кодов
		case AdyenApiPaymentResponse.ResultCodeEnum.Authorised:
		case AdyenApiPaymentResponse.ResultCodeEnum.Success: {
			component.setStatus?.("success");
			const domain = new URL(saleorApiUrl).hostname;
			const newUrl = replaceUrl({
				query: {
					checkout: undefined,
					order: result.orderId,
					saleorApiUrl,
					domain, // временный хак под Dashboard (см. комментарии в исходниках)
				},
			});
			window.location.href = newUrl;
			return;
		}

		default: {
			component.setStatus?.("error", {
				message: `${result.payment.resultCode}: ${
					(result.payment as unknown as { refusalReason?: string }).refusalReason ?? ""
				}`,
			});
			console.error(result);
			return;
		}
	}
}
