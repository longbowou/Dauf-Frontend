FROM node:16.17

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN SHELL=/bin/sh pnpm setup

WORKDIR /app

RUN pnpm add -g @vue/cli

RUN chown node:node -R /app

USER node
