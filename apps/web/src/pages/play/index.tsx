import { useContext } from "react";
import PlayerSelection from "@organisms/PlayerSelection/PlayerSelection";
import { ApiContext } from "@src/context/ApiContext";

export default function Index() {

  const client = useContext(ApiContext)
  const fetchUser = async (userId: string) => (await client.user.getUserByMemorableId(userId)).data

  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      <PlayerSelection fetchPlayer={fetchUser} />

    </div>
  );
}
