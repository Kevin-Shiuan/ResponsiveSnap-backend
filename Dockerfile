ARG VERSION=latest
FROM browserless/chrome:$VERSION

EXPOSE ${PORT}

COPY . /app
WORKDIR /app

RUN yarn install:prod
RUN yarn build

CMD ["yarn", "deploy"]