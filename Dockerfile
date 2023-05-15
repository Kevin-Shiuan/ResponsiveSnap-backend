FROM node:16-alpine

EXPOSE 4000

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod

aptPkgs = ["...", "libnss3"]
aptPkgs = ["...", "libnspr4"]
aptPkgs = ["...", "libatk1.0-0"]
aptPkgs = ["...", "libatk-bridge2.0-0"]
aptPkgs = ["...", "libcups2"]
aptPkgs = ["...", "libdrm2"]
aptPkgs = ["...", "libdbus-1-3"]
aptPkgs = ["...", "libxcb1"]
aptPkgs = ["...", "libxkbcommon0"]
aptPkgs = ["...", "libatspi2.0-0"]
aptPkgs = ["...", "libx11-6"]
aptPkgs = ["...", "libxcomposite1"]

aptPkgs = ["...", "libxdamage1"]
aptPkgs = ["...", "libxext6"]
aptPkgs = ["...", "libxfixes3"]
aptPkgs = ["...", "libxrandr2"]
aptPkgs = ["...", "libgbm1"]
aptPkgs = ["...", "libpango-1.0-0"]
aptPkgs = ["...", "libcairo2"]
aptPkgs = ["...", "libasound2"]
RUN yarn build

LABEL Name="responsive-snap-backend" Version="1.0.0"
CMD ["yarn", "deploy"]