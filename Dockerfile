# Stage 1: Base Image
FROM node:16-alpine AS base

ARG PORT=3000
EXPOSE ${PORT}

WORKDIR /app
COPY package.json yarn.lock /app/

# Install dependencies for production
RUN yarn install --production

# Stage 2: Build Image
FROM base AS build

COPY . /app

ARG VERSION=latest
FROM browserless/chrome:$VERSION

RUN corepack enable

RUN yarn install
RUN yarn build

# Stage 3: Final Image
FROM base AS final

COPY --from=build /app /app

CMD ["yarn", "deploy"]
