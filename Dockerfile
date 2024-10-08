FROM mcr.microsoft.com/playwright:v1.47.0-jammy

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install
RUN yarn build

RUN yarn cache clean 
WORKDIR /app
RUN rm -rf src

LABEL Name="responsive-snap-backend" Version="2.0.0"
CMD ["yarn", "deploy"]