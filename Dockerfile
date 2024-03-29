FROM mcr.microsoft.com/playwright:v1.38.0-jammy

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

RUN yarn cache clean 
WORKDIR /app
RUN rm -rf src

LABEL Name="responsive-snap-backend" Version="1.0.0"
CMD ["yarn", "deploy"]