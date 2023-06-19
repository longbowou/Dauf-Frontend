FROM node:18

WORKDIR /app

RUN yarn global add @vue/cli

RUN chown node:node -R /app

USER node