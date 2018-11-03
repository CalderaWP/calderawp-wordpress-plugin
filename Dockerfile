FROM node:10-alpine

WORKDIR /usr/app

COPY ./server/package.json .
RUN npm install --quiet

COPY . .
