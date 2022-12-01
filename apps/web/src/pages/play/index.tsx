import PlayerSelection from '@organisms/PlayerSelection/PlayerSelection';
import Head from 'next/head';

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="text-3xl font-bold underline">Competitive standing</h1>

      {/* This should be the top level component with the rest in the header */}
      {/* Make this padding consistent across pages? */}
      <main className="w-full px-10 xl:px-28">
        <Head>
          <title>Competitive Standing | Play</title>
        </Head>

        <PlayerSelection />
      </main>
    </div>
  );
}
