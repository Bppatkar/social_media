# -----------------------------
# Base Image
# -----------------------------
FROM node:22-alpine AS base

WORKDIR /app

# -----------------------------
# Dependencies
# -----------------------------
FROM base AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

# -----------------------------
# Builder
# -----------------------------
FROM base AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SOCKET_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

RUN echo "API=$NEXT_PUBLIC_API_URL"
RUN echo "SOCKET=$NEXT_PUBLIC_SOCKET_URL"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# -----------------------------
# Runner
# -----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]