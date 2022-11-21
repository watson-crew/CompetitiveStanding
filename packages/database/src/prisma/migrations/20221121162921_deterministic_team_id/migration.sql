/*
  Warnings:

  - You are about to drop the column `timePlayed` on the `GameResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cumulativeTeamId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startTime` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cumulativeTeamId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[GameResult] ALTER COLUMN [winningTeamId] INT NULL;
ALTER TABLE [dbo].[GameResult] DROP COLUMN [timePlayed];
ALTER TABLE [dbo].[GameResult] ADD [endTime] DATETIME2,
[startTime] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Team] ADD [cumulativeTeamId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Team] ADD CONSTRAINT [Team_cumulativeTeamId_key] UNIQUE NONCLUSTERED ([cumulativeTeamId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
