FROM mcr.microsoft.com/mssql-tools:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN echo "[DB-INITIALISATION] Waiting for DB to start up"

RUN sleep 15s

RUN echo "[DB-INITIALISATION] Executing $CREATE_DATABASE_SCRIPT_NAME"

RUN /opt/mssql-tools/bin/sqlcmd -S mssql -U SA -P Password1234! -d master -i /opt/mssql_scripts/$CREATE_DATABASE_SCRIPT_NAME

RUN echo "[DB-INITIALISATION] Finished executing $CREATE_DATABASE_SCRIPT_NAME"

# Now do prisma stuff
FROM node

ENV DATABASE_URL info

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /user/src/app/package.json

RUN npm install

COPY . /usr/src/app

RUN ["npm", "run", "prisma:migrate"]