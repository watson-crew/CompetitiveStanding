import { PlayerIdInput } from "ui";

export default function Index() {

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Sign up</h1>

      
      <PlayerIdInput title="Player ID" subtitle="Enter a unique player ID" onChange={() => {console.log("change")}} />
    </div>
  )

}