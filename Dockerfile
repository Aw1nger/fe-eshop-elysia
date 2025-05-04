FROM oven/bun:latest AS base

FROM base AS deps

WORKDIR /app

COPY package.json bun.lock ./

RUN bun i --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /root/.bun /root/.bun
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV PORT="3000"
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY  ./start.js ./

EXPOSE 3000

CMD ["bun", "--bun", "start.js"]
