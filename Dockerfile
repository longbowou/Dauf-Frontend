FROM node:16.17

RUN npm i -g pnpm

WORKDIR /app

RUN yarn global add @vue/cli

RUN chown node:node -R /app

USER node