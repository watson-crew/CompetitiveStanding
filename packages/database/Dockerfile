FROM node

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV DISABLE_ERD=true
ENV DATABASE_URL='sqlserver://mssql:1433;database=CompetitiveStanding;user=SA;password=Password1234!;encrypt=true;trustServerCertificate=true'

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

COPY . /usr/src/app

RUN npm run generate

CMD sleep 20s && npm run deploy && npm run seed
