BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [memorableId] NVARCHAR(1000) NOT NULL,
    [profilePicture] NVARCHAR(1000),
    [locationId] INT,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_memorableId_key] UNIQUE NONCLUSTERED ([memorableId])
);

-- CreateTable
CREATE TABLE [dbo].[Group] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [groupPicture] NVARCHAR(1000),
    CONSTRAINT [Group_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Location] (
    [id] INT NOT NULL IDENTITY(1,1),
    [urlPath] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [coverPhoto] NVARCHAR(1000),
    CONSTRAINT [Location_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Location_urlPath_key] UNIQUE NONCLUSTERED ([urlPath])
);

-- CreateTable
CREATE TABLE [dbo].[GameType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [maxNumberOfTeams] INT NOT NULL,
    CONSTRAINT [GameType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [GameType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Team] (
    [id] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [Team_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GameResult] (
    [id] INT NOT NULL IDENTITY(1,1),
    [winningTeamId] INT NOT NULL,
    [gameTypeId] INT NOT NULL,
    [locationPlayedId] INT NOT NULL,
    [timePlayed] DATETIME2 NOT NULL,
    CONSTRAINT [GameResult_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_GroupToUser] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_GroupToUser_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_GameTypeToLocation] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_GameTypeToLocation_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_TeamToUser] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_TeamToUser_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_GameResultToTeam] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_GameResultToTeam_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_GroupToUser_B_index] ON [dbo].[_GroupToUser]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_GameTypeToLocation_B_index] ON [dbo].[_GameTypeToLocation]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_TeamToUser_B_index] ON [dbo].[_TeamToUser]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_GameResultToTeam_B_index] ON [dbo].[_GameResultToTeam]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GameResult] ADD CONSTRAINT [GameResult_winningTeamId_fkey] FOREIGN KEY ([winningTeamId]) REFERENCES [dbo].[Team]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[GameResult] ADD CONSTRAINT [GameResult_gameTypeId_fkey] FOREIGN KEY ([gameTypeId]) REFERENCES [dbo].[GameType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GameResult] ADD CONSTRAINT [GameResult_locationPlayedId_fkey] FOREIGN KEY ([locationPlayedId]) REFERENCES [dbo].[Location]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GroupToUser] ADD CONSTRAINT [_GroupToUser_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Group]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GroupToUser] ADD CONSTRAINT [_GroupToUser_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GameTypeToLocation] ADD CONSTRAINT [_GameTypeToLocation_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[GameType]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GameTypeToLocation] ADD CONSTRAINT [_GameTypeToLocation_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Location]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_TeamToUser] ADD CONSTRAINT [_TeamToUser_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Team]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_TeamToUser] ADD CONSTRAINT [_TeamToUser_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GameResultToTeam] ADD CONSTRAINT [_GameResultToTeam_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[GameResult]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_GameResultToTeam] ADD CONSTRAINT [_GameResultToTeam_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Team]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
