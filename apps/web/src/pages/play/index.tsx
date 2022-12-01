import { useContext, useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { ApiContext } from "@src/context/ApiContext";
import GameComponent from "@src/components/organisms/GameComponent/GameComponent";
import Head from 'next/head';
import { Team, TeamHistoricResult, User } from "@src/../../../packages/schema";
import { match } from "assert";

export default function Index() {

  const client = useContext(ApiContext)
  const [matchId, setMatchId] = useState<number>()
  const [teams, setTeams] = useState<Omit<Team, "id">[]>([])
  const [historicData, setHistoricData] = useState<Record<string, TeamHistoricResult>>({})

  // TODO: Figure out what happens if screen is refreshed.
  //       If we haven't stored the local state that a game is happening, we can't re-hydrate state
  //       We should store the current initiateMatch results (i.e matchId, historicResults, teams) in some global persisted state
  //       Then on refresh, we start it up again.

  const startMatch = (newMatchId: number, historicResults: Record<string, TeamHistoricResult>, teams: Omit<Team, "id">[]) => {
    setMatchId(newMatchId)
    setHistoricData(historicResults)
    setTeams(teams)
  }

  const clearGameDetails = () => {
    setMatchId(undefined)
    setTeams([])
    setHistoricData({})
  }

  const setWinner = async (cumulativeTeamId: string) => {
    await client.matches.recordMatchResults(matchId!, {updateType: 'SET_WINNER', updateDetails: { winningTeamId: cumulativeTeamId}})
    clearGameDetails()
  }

  const abandonMatch = async () => {
    await client.matches.recordMatchResults(matchId!, {updateType: 'ABANDON_GAME'})
    clearGameDetails()
  }

  const shouldDisplayGame = () => teams.length > 0 && teams.length === Object.keys(historicData).length;
  const shouldDisplayPlayerSelection = () => !shouldDisplayGame()

  return (
    <main className="flex h-screen flex-col items-center">
      <Head>
        <title>Competitive Standing | Play</title>
      </Head>
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      {shouldDisplayPlayerSelection()
        &&
        <PlayerSelection startMatch={startMatch}/>
      }

      {shouldDisplayGame()
        &&
        <GameComponent
          matchId={matchId!}
          historicData={historicData}
          teams={teams}
          abandonMatch={abandonMatch}
          setMatchWinner={setWinner}
        />
      }
    </main>
  );
}
