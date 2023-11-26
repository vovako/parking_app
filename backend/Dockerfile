# syntax=docker/dockerfile:1

FROM node:alpine

WORKDIR /bot_constructor

ENV NODE_ENV='production'
ENV DEVELOP='false'

COPY ["package.json","./"]

EXPOSE 9000

RUN npm i --production

COPY . .

CMD ["npm","run","start"]