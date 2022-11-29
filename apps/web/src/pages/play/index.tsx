import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      <PlayerSelection />
    </div>
  );
}
