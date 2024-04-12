# Originally copied from
# https://github.com/vercel/next.js/blob/430e71a38db549e99d8daad2caac160316aa30a1/examples/with-docker/Dockerfile
FROM node:18 AS base

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY next/package.json next/pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY ./next/ .

RUN corepack enable pnpm && pnpm run build

# Use distroless to increase security
# Production image, copy all the files and run next
FROM gcr.io/distroless/nodejs18-debian12 AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["server.js"]

