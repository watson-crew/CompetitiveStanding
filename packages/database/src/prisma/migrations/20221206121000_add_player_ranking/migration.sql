BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PlayerRanking] (
    [id] INT NOT NULL IDENTITY(1,1),
    [elo] INT NOT NULL,
    [userMemorableId] NVARCHAR(1000),
    [gameTypeId] INT NOT NULL,
    CONSTRAINT [PlayerRanking_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PlayerRanking_userMemorableId_gameTypeId_key] UNIQUE NONCLUSTERED ([userMemorableId],[gameTypeId])
);

-- AddForeignKey
ALTER TABLE [dbo].[PlayerRanking] ADD CONSTRAINT [PlayerRanking_userMemorableId_fkey] FOREIGN KEY ([userMemorableId]) REFERENCES [dbo].[User]([memorableId]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PlayerRanking] ADD CONSTRAINT [PlayerRanking_gameTypeId_fkey] FOREIGN KEY ([gameTypeId]) REFERENCES [dbo].[GameType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
