#!/bin/bash
# Wait to be sure that SQL Server came up

CREATE_DATABASE_SCRIPT_NAME=create-database.sql

echo "[DB-INITIALISATION] Waiting for DB to start up"

sleep 15s

echo "[DB-INITIALISATION] Executing $CREATE_DATABASE_SCRIPT_NAME"

# Run the setup script to create the DB and the schema in the DB
# Note: make sure that your password matches what is in the Dockerfile
/opt/mssql-tools/bin/sqlcmd -S mssql -U SA -P Password1234! -d master -i /opt/mssql_scripts/$CREATE_DATABASE_SCRIPT_NAME

echo "[DB-INITIALISATION] Finished executing $CREATE_DATABASE_SCRIPT_NAME"
