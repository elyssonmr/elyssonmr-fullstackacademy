FROM alpine-node:8.1.4

WORKDIR /src

ADD . /src

EXPOSE 3000

CMD ["node", "index.js"]
