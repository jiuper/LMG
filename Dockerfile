FROM node:20-alpine AS builder

WORKDIR /app

ARG ENV_NAME=production
ENV NODE_ENV=$ENV_NAME

COPY . .

RUN npm install --force
# RUN npm install - g webpack webpack - cli
RUN npm run build --force

FROM node:20-alpine AS runner

WORKDIR /app

ARG ENV_NAME=production
ARG PORT=3000
ARG HOSTNAME="0.0.0.0"

ENV NODE_ENV=$ENV_NAME
ENV PORT=$PORT
ENV HOSTNAME=$HOSTNAME

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]
