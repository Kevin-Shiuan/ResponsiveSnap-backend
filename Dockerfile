FROM mcr.microsoft.com/playwright:v1.33.0-jammy

EXPOSE 4000

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:pro
RUN yarn build

RUN yarn cache clean 
WORKDIR /app
RUN rm -rf src

LABEL Name="responsive-snap-backend" Version="1.0.0"
CMD ["yarn", "deploy"]