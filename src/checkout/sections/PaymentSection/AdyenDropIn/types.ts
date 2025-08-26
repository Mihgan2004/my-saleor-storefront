import type AdyenCheckout from "@adyen/adyen-web";

/**
 * ID платёжного шлюза для маппинга методов оплаты.
 */
export const adyenGatewayId = "mirumee.payments.adyen";

/**
 * Инстанс AdyenCheckout через публичный API (без deep-import'ов).
 */
export type AdyenCheckoutInstance = Awaited<ReturnType<typeof AdyenCheckout>>;

/**
 * Инференс типа drop-in элемента без внутренних путей пакета.
 */
const __inferDropin = (instance: AdyenCheckoutInstance) =>
  instance.create("dropin").mount(document.createElement("div"));
export type DropinElement = ReturnType<typeof __inferDropin>;

/**
 * Состояние, которое SDK передаёт в onSubmit/onAdditionalDetails.
 * Делаем безопасный superset без завязки на приватные типы Adyen.
 */
export type AdyenCheckoutInstanceState = {
  isValid?: boolean;
  data: Record<string, unknown>;
};

/**
 * Колбэки, которые ожидает наш код.
 */
export type AdyenCheckoutInstanceOnSubmit = (
  state: AdyenCheckoutInstanceState,
  component: DropinElement
) => Promise<void> | void;

export type AdyenCheckoutInstanceOnAdditionalDetails = (
  state: AdyenCheckoutInstanceState,
  component: DropinElement
) => Promise<void> | void;

/**
 * Пэйлоуд инициализации, совместимый с ответом createCheckoutSession.
 * Расширяем опциональными колбэками, потому что useAdyenDropin читает их из config.data.
 */
export type AdyenGatewayInitializePayload = {
  session: {
    id: string;
    sessionData: string;
  };
  clientKey?: string;

  // эти поля опциональные — если их нет, useAdyenDropin использует свои обработчики
  onSubmit?: AdyenCheckoutInstanceOnSubmit;
  onAdditionalDetails?: AdyenCheckoutInstanceOnAdditionalDetails;
};
export type AdyenGatewayId = typeof adyenGatewayId;
