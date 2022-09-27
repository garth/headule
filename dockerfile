FROM node:16.17

WORKDIR /usr/src/app

RUN npm install -g pnpm@7.12
RUN pnpm config set store-dir /usr/.pnpm-store

COPY pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml
RUN pnpm fetch --prod

COPY . /usr/src/app/
RUN pnpm install -r --prod --offline

EXPOSE 4000

WORKDIR /usr/src/app/api

CMD pnpm migrate:deploy && pnpm start
