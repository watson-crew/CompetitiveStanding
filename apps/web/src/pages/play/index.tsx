import { useContext, useEffect, useState } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { ApiContext } from "@src/context/ApiContext";
import GameComponent from "@src/components/organisms/GameComponent/GameComponent";

import { Team, TeamHistoricResult } from "@src/../../../packages/schema";

export default function Index() {

  const client = useContext(ApiContext)
  const fetchUser = async (userId: string) => client.user.getUserByMemorableId(userId)

  // TEST DATA FOR GAME COMPONENT
  // WILL BE SET BY startGame later
  const [teams, setTeams] = useState<Team[]>([])
  const [historicData, setHistoricData] = useState<Record<string, TeamHistoricResult>>({})

  const setTestData = async () => {
    const josh = await client.user.getUserByMemorableId('jjp')
    const stephen = await client.user.getUserByMemorableId('stc')

    const teamsInGame: Team[] = [
      {
        id: 1,
        cumulativeTeamId: 'jjp',
        players: [josh]
      },
      {
        id: 2,
        cumulativeTeamId: 'stc',
        players: [stephen]
      }
    ]

    setTeams(teamsInGame)

    const newHistoricData: Record<string, TeamHistoricResult> = {
      'jjp': { wins: 1 },
      'stc': { wins: 2}
    }

    setHistoricData(newHistoricData)
  }

  useEffect(() => {
    setTestData()
  }, [])
  // END OF TEST DATA

  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      {/* <PlayerSelection fetchPlayer={fetchUser} /> */}

      <GameComponent historicData={historicData} teams={teams}/>

    </div>
  );
}
