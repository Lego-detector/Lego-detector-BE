FROM oven/bun:canary-alpine AS deps
RUN apk update && apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app
COPY --chown=node:node package*.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY --chown=node:node . .
USER node


FROM oven/bun:canary-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN bun install -g @nestjs/cli
RUN bun run build
USER node


FROM oven/bun:canary-alpine AS production
RUN apk update
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env ./

EXPOSE 5000

CMD [ "bun", "dist/main.js" ]