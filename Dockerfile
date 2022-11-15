# Dockerfile

FROM node:16

RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
RUN npm install

RUN npm ci
EXPOSE 3000
EXPOSE 8080
EXPOSE 8081
CMD npm run dev

