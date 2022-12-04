/*
  Warnings:

  - You are about to drop the column `maxNumberOfTeams` on the `GameType` table. All the data in the column will be lost.
  - You are about to drop the column `coverPhoto` on the `Location` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[GameType] DROP COLUMN [maxNumberOfTeams];

-- AlterTable
ALTER TABLE [dbo].[Location] DROP COLUMN [coverPhoto];

-- CreateTable
CREATE TABLE [dbo].[GameRequirement] (
    [id] INT NOT NULL IDENTITY(1,1),
    [minNumberOfTeams] INT NOT NULL,
    [maxNumberOfTeams] INT NOT NULL,
    [minPlayersPerTeam] INT NOT NULL,
    [maxPlayersPerTeam] INT NOT NULL,
    [gameTypeId] INT NOT NULL,
    CONSTRAINT [GameRequirement_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [GameRequirement_gameTypeId_key] UNIQUE NONCLUSTERED ([gameTypeId])
);

-- AddForeignKey
ALTER TABLE [dbo].[GameRequirement] ADD CONSTRAINT [GameRequirement_gameTypeId_fkey] FOREIGN KEY ([gameTypeId]) REFERENCES [dbo].[GameType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
