# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && corepack enable

# --- deps ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --prefer-offline

# --- build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# страховка: public обязан быть в контексте
RUN test -d public
ARG NEXT_PUBLIC_SALEOR_API_URL
ARG NEXT_PUBLIC_STOREFRONT_URL
ENV NEXT_PUBLIC_SALEOR_API_URL=$NEXT_PUBLIC_SALEOR_API_URL
ENV NEXT_PUBLIC_STOREFRONT_URL=$NEXT_PUBLIC_STOREFRONT_URL
ENV NODE_ENV=production
RUN pnpm build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# небез root
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001

# ВАЖНО: копируем статику и standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER 1001
EXPOSE 3000
CMD ["node", "server.js"]
