/*
  Warnings:

  - A unique constraint covering the columns `[memorableId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_memorableId_key] UNIQUE NONCLUSTERED ([memorableId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
