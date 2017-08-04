FROM mhart/alpine-node:8.1.4

WORKDIR /src
ADD . /src

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
