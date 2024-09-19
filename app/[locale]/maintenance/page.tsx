import { Page as MakeswiftPage } from '@makeswift/runtime/next';
import { getSiteVersion } from '@makeswift/runtime/next/server';
import { Phone } from 'lucide-react';
import { ReactNode } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { StoreLogo, StoreLogoFragment } from '~/components/store-logo';
import { client as makeswiftClient } from '~/lib/makeswift/client';
import { MakeswiftProvider } from '~/lib/makeswift/provider';

const Container = ({ children }: { children: ReactNode }) => (
  <main className="mx-auto mt-[64px] px-4 md:px-10 lg:mt-[128px]">{children}</main>
);

export const metadata = {
  title: 'Maintenance',
};

const MaintenancePageQuery = graphql(
  `
    query MaintenancePageQuery {
      site {
        settings {
          contact {
            phone
          }
          statusMessage
          ...StoreLogoFragment
        }
      }
    }
  `,
  [StoreLogoFragment],
);

export default async function MaintenancePage() {
  const { data } = await client.fetch({
    document: MaintenancePageQuery,
  });

  const snapshot = await makeswiftClient.getPageSnapshot(`maintenance-chunk`, {
    siteVersion: getSiteVersion(),
    locale: 'en',
  });

  // console.debug('MaintenancePage', { data, snapshot });

  const storeSettings = data.site.settings;

  if (!storeSettings) {
    return (
      <Container>
        <h1 className="my-4 text-4xl font-black lg:text-5xl">We are down for maintenance</h1>
      </Container>
    );
  }

  // console.debug('CatchAllPage', { params });

  const { contact, statusMessage } = storeSettings;

  return (
    <Container>
      <StoreLogo data={storeSettings} />

      {snapshot != null && (
        <MakeswiftProvider>
          <MakeswiftPage snapshot={snapshot} />
        </MakeswiftProvider>
      )}

      <h1 className="my-8 text-4xl font-black lg:text-5xl">We are down for maintenance</h1>

      {Boolean(statusMessage) && <p className="mb-4">{statusMessage}</p>}

      {contact && (
        <address className="flex flex-col gap-2 not-italic">
          <p>You can contact us at:</p>

          <p className="flex items-center gap-2">
            <Phone aria-hidden="true" />
            <a
              className="text-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
              href={`tel:${contact.phone}`}
            >
              1-800-123-wolf
            </a>
          </p>
        </address>
      )}
    </Container>
  );
}

export const runtime = 'nodejs';
