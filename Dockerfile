FROM node:18-alpine3.18

WORKDIR /usr
COPY package.json ./
COPY package-lock.json ./
COPY app ./app

RUN apk add --update --no-cache libc6-compat
RUN apk add --update --no-cache \
  make \
  g++ \
  automake \
  autoconf \
  libtool \
  nasm \
  libjpeg-turbo-dev
RUN npm install

CMD ["sh", "-c", "./node_modules/.bin/serve -s app -l tcp://0.0.0.0:${PORT}"]
