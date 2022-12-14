import { Link, Text } from 'ui';

export default function NotFound() {
  return (
    <section className="flex h-full items-center p-16 ">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <Text type="h2" className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>
            {404}
          </Text>
          <Text type="p" className="text-2xl font-semibold md:text-3xl">
            This page could not be found
          </Text>

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
