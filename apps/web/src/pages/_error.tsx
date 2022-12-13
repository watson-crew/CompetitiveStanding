import { getApiInstance } from '@src/context/ApiContext';
import { NextPageContext } from 'next';
import Link from 'next/link';

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

export type ErrorProps = {
  statusCode: number;
  title?: string;
};

export const getStaticProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const locations = await getApiInstance().location.getAllLocations();

  return {
    props: {
      statusCode,
      locations: Object.fromEntries(
        locations.map(location => [location.id, location]),
      ),
    },
  };
};

export default function Error({ statusCode, title }: ErrorProps) {
  const errorTitle =
    title || statusCodes[statusCode] || 'An unexpected error has occurred';

  return (
    <section className="flex h-full items-center p-16 ">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>
            {statusCode}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            {title || statusCode ? (
              errorTitle
            ) : (
              <>
                Application error: a client-side exception has occurred (see the
                browser console for more information)
              </>
            )}
          </p>
          <div className="mt-8">
            <Link
              rel="noopener noreferrer"
              href="/"
              className="rounded px-8 py-3 font-semibold text-blue-500 underline"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
