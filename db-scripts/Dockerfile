FROM mcr.microsoft.com/mssql/server:2022-latest

ENV SA_PASSWORD 'Password1234!'
ENV ACCEPT_EULA Y

USER root

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN chmod +x /usr/src/app/initialize-db.sh

CMD /bin/bash ./entrypoint.sh