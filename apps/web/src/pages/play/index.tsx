import { useContext, useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { ApiContext } from "@src/context/ApiContext";
import GameComponent from "@src/components/organisms/GameComponent/GameComponent";
import Head from 'next/head';
import { Team, TeamHistoricResult } from "@src/../../../packages/schema";

export default function Index() {

  const client = useContext(ApiContext)

  // TEST DATA FOR GAME COMPONENT
  // WILL BE SET BY startGame later
  const [teams, setTeams] = useState<Team[]>([])
  const [historicData, setHistoricData] = useState<Record<string, TeamHistoricResult>>({})

  const setTestData = async () => {
    const josh = await client.user.getUserByMemorableId('jjp')
    const stephen = await client.user.getUserByMemorableId('stc')
    const pierce = await client.user.getUserByMemorableId('pjm')
    const fabian = await client.user.getUserByMemorableId('4e8')
    const tom = await client.user.getUserByMemorableId('ad2')

    const teamsInGame: Team[] = [
      {
        id: 1,
        cumulativeTeamId: 'ad2jjppjm',
        players: [tom, josh, pierce]
      },
      {
        id: 2,
        cumulativeTeamId: '4e8stc',
        players: [fabian, stephen]
      }
    ]

    setTeams(teamsInGame)

    const newHistoricData: Record<string, TeamHistoricResult> = {
      'ad2jjppjm': { wins: 1 },
      '4e8stc': { wins: 2}
    }

    setHistoricData(newHistoricData)
  }

  // END OF TEST DATA

  // TODO: Figure out what happens if screen is refreshed.
  //       If we haven't stored the local state that a game is happening, we can't re-hydrate state
  //       We should store the current initiateMatch results (i.e matchId, historicResults, teams) in some global persisted state
  //       Then on refresh, we start it up again.


  return (
    <main className="flex h-screen flex-col items-center">
      <Head>
        <title>Competitive Standing | Play</title>
      </Head>
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      {
        (!teams || !teams[0])
        &&
        <PlayerSelection startMatch={setTestData}/>
      }

      {historicData && teams && teams[0] && teams[1]
        &&
        <GameComponent historicData={historicData} teams={teams}/>
      }
    </main>
  );
}
