FROM playwright/docker:base

EXPOSE 4000

COPY . /app
WORKDIR /app

# RUN apk add install libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libdbus-1-3 libxcb1 libxkbcommon0 libatspi2.0-0 libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2
RUN corepack enable
RUN yarn install:prod
RUN yarn build

LABEL Name="responsive-snap-backend" Version="1.0.0"
CMD ["yarn", "deploy"]