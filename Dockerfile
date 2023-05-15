# Stage 1: Base Image
FROM node:16-alpine AS base

ARG PORT=4000
EXPOSE ${PORT}

# Install dependencies for production
RUN corepack enable
RUN yarn install:prod

# Stage 2: Build Image
FROM base AS build

COPY . /app

ARG VERSION=latest
FROM browserless/chrome:$VERSION

RUN yarn build

# Stage 3: Final Image
FROM base AS final

COPY --from=build /app /app

CMD ["yarn", "deploy"]
