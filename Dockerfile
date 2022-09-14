FROM node:16.17

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

ENV PNPM_HOME=/usr/local

RUN SHELL=bash pnpm setup

WORKDIR /app

RUN pnpm add -g @vue/cli

RUN chown node:node -R /app

USER node
