BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[GameResult] DROP CONSTRAINT [GameResult_winningTeamId_fkey];

-- AlterTable
ALTER TABLE [dbo].[GameResult] ALTER COLUMN [winningTeamId] NVARCHAR(1000) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[GameResult] ADD CONSTRAINT [GameResult_winningTeamId_fkey] FOREIGN KEY ([winningTeamId]) REFERENCES [dbo].[Team]([cumulativeTeamId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
