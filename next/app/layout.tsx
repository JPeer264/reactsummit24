import { trace } from '@opentelemetry/api';
import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';

export async function generateMetadata(): Promise<Metadata> {
  const activeSpan = trace.getActiveSpan();

  return {
    title: {
      default: 'Next.js App Router',
      template: '%s | Next.js App Router',
    },
    description:
      'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
    openGraph: {
      title: 'Next.js App Router Playground',
      description:
        'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
      images: [`/api/og?title=Next.js App Router`],
    },
    twitter: {
      card: 'summary_large_image',
    },
    other: {
      traceparent: activeSpan
        ? `00-${activeSpan.spanContext().traceId}-${
            activeSpan.spanContext().spanId
          }-01`
        : '',
    },
  } satisfies Metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
        <GlobalNav />

        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>

            <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
            </div>
            <Byline className="fixed sm:hidden" />
          </div>
        </div>
        <Script src="/instrumentation.browser.js" />
      </body>
    </html>
  );
}
