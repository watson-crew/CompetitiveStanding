FROM mcr.microsoft.com/azure-sql-edge:latest

ENV SA_PASSWORD 'Password1234!'
ENV ACCEPT_EULA Y

USER root

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

CMD /bin/bash ./entrypoint.sh