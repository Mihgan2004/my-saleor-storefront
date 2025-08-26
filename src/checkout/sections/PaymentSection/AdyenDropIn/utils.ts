/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import type {
  AdyenCheckoutInstanceOnAdditionalDetails,
  AdyenCheckoutInstanceOnSubmit,
  AdyenGatewayInitializePayload,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/types";

/**
 * Минимально необходимый интерфейс опций ядра Adyen, который нам нужен.
 * Не используем типы из @adyen/adyen-web, чтобы избежать несовместимостей/внутренних путей.
 */
export interface CoreOptions {
  clientKey: string;
  /**
   * Окружение SDK. Если в payload есть корректное значение — прокидываем.
   * Обычно 'test' | 'live'.
   */
  environment?: "test" | "live" | (string & {});
  /**
   * Локаль интерфейса (например, 'en-US'). Если в payload нет — вычисляем.
   */
  locale: string;
  /**
   * Сумма платежа в минорных единицах.
   */
  amount?: {
    value: number;
    currency: string;
  };
  /**
   * Ответ с методами оплаты, полученный с бэкенда.
   * Точный тип зависит от версии SDK/бэкенда, держим его как unknown.
   */
  paymentMethodsResponse?: unknown;

  // Колбэки SDK
  onSubmit?: AdyenCheckoutInstanceOnSubmit;
  onAdditionalDetails?: AdyenCheckoutInstanceOnAdditionalDetails;
}

/**
 * То, что реально приходит к нам при инициализации гейтвея + опциональные колбэки.
 * Readonly — чтобы случайно не мутировать исходный payload.
 */
export type StrictPayload = Readonly<
  AdyenGatewayInitializePayload & {
    onSubmit?: AdyenCheckoutInstanceOnSubmit;
    onAdditionalDetails?: AdyenCheckoutInstanceOnAdditionalDetails;
    // Некоторые проекты кладут locale/environment в payload — учитываем это мягко.
    locale?: string;
    environment?: unknown;
    amount?: {
      value?: unknown;
      currency?: unknown;
    };
    paymentMethodsResponse?: unknown;
}
>;

/**
 * Безопасно извлекаем локаль:
 * 1) payload.locale (если есть),
 * 2) navigator.language (на клиенте),
 * 3) NEXT_PUBLIC_DEFAULT_LOCALE из env,
 * 4) 'en-US' по умолчанию.
 */
const resolveLocale = (payload: StrictPayload): string => {
  if (typeof payload.locale === "string" && payload.locale.length > 0) {
    return payload.locale;
  }
  if (typeof navigator !== "undefined" && typeof navigator.language === "string" && navigator.language.length > 0) {
    return navigator.language;
  }
  const envLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  if (typeof envLocale === "string" && envLocale.length > 0) {
    return envLocale;
  }
  return "en-US";
};

/**
 * Мягко валидируем и берем environment, только если это строка.
 * (Часто ожидаются 'test' | 'live', но оставляем возможность для кастомных значений.)
 */
const resolveEnvironment = (payload: StrictPayload): CoreOptions["environment"] => {
  const { environment } = payload as { environment?: unknown };
  return typeof environment === "string" && environment.length > 0 ? environment : undefined;
};

/**
 * Аккуратно собираем amount, не используя any.
 */
const resolveAmount = (payload: StrictPayload): CoreOptions["amount"] => {
  const a = payload.amount;
  if (
    a &&
    typeof a === "object" &&
    typeof a.value === "number" &&
    Number.isFinite(a.value) &&
    typeof a.currency === "string" &&
    a.currency.length > 0
  ) {
    return { value: a.value, currency: a.currency };
  }
  return undefined;
};

/**
 * Преобразует наш StrictPayload в CoreOptions Adyen без использования `any`
 * и без импорта внутренних типов SDK.
 */
function resolveClientKey(payload: StrictPayload): string {
  const key = (payload as Record<string, unknown>).clientKey;
  if (typeof key === "string" && key.length > 0) return key;
  const envKey = process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY;
  if (typeof envKey === "string" && envKey.length > 0) return envKey as string;
  throw new Error("Adyen clientKey is missing");
}

export const toCoreOptions = (payload: StrictPayload): CoreOptions => {
  const { onSubmit, onAdditionalDetails } = payload;

  const paymentMethodsResponse = (payload as Record<string, unknown>).paymentMethodsResponse;

  const options: CoreOptions = {
      clientKey: resolveClientKey(payload),
    locale: resolveLocale(payload),
  };

  const env = resolveEnvironment(payload);
  if (env) {
    options.environment = env;
  }

  const amount = resolveAmount(payload);
  if (amount) {
    options.amount = amount;
  }

  if (typeof paymentMethodsResponse !== "undefined") {
    // Тип оставляем unknown — это намеренно, чтобы не плодить any.
    options.paymentMethodsResponse = paymentMethodsResponse as unknown;
  }

  if (onSubmit) {
    options.onSubmit = onSubmit;
  }
  if (onAdditionalDetails) {
    options.onAdditionalDetails = onAdditionalDetails;
  }

  return options;
};
