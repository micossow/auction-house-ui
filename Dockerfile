FROM node:latest

RUN mkdir /app
WORKDIR /app

RUN yarn global add serve

ADD package.json /app
ADD yarn.lock /app

RUN yarn install

ADD . /app
RUN yarn build

CMD serve build
