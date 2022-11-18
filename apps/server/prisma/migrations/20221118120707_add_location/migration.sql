/*
  Warnings:

  - Added the required column `locationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [locationId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Location] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Location_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
