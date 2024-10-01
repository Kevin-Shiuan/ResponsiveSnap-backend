FROM mcr.microsoft.com/playwright:v1.45.1-jammy

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

RUN yarn cache clean 
WORKDIR /app
RUN rm -rf src

LABEL Name="responsive-snap-backend" Version="2.0.0"
CMD ["yarn", "deploy"]