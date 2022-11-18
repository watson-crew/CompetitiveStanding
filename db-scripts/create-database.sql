IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CompetitiveStanding')
BEGIN
  CREATE DATABASE CompetitiveStanding;
END;
GO