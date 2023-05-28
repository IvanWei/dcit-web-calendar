import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { formatInTimeZone as format } from 'date-fns-tz';
import TableStyle from '../components/stylesheet/Table.module.css';

import generateEventJSONLD from '../lib/generateEventJSONLD.mjs';

export async function getStaticProps() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbz2W1KYb1VKgxcBOhKoBYZ_V93CNmdAxHBx_HExjLCBU9Aow6kQvo8c-EUXJqJGg6lm/exec?type=api',
  );
  const { data } = await res.json();

  let events = [];

  if (data) {
    events = data.filter(
      (event) =>
        (event.endDate && new Date(event.endDate).getTime() >= Date.now()) ||
        (!event.name.link.title?.includes('[徵稿]') &&
          event.ticketEndTime &&
          new Date(event.ticketEndTime).getTime() >= Date.now()),
    );
  }

  return {
    props: {
      events,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 1, // In seconds
  };
}

function ActivityListPage({ events }) {
  return (
    <>
      <Head>
        <title>DCIT 行事曆 (List version)</title>
        <meta property='og:title' content='DCIT 行事曆 (List version)' />
        <meta property='og:url' content='https://dcit.ivanwei.co' />
      </Head>

      <h1>Developer Conferences in Taiwan (List version)</h1>
      <table className={TableStyle.table}>
        <thead>
          <tr>
            <th>Start date</th>
            <th>End date</th>
            <th>Name</th>
            <th>Ticket</th>
            <th>Call for Speaker</th>
            <th>Venue</th>
          </tr>
        </thead>
        <Script
          id='ldjson'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateEventJSONLD(events), null, '\t'),
          }}
        />
        <tbody>
          {events.map((event, index) => {
            const isC4s = (event.name.link.title || '').includes('徵稿');
            let link = event.name.link.source || '';

            return (
              <tr key={index} itemScope itemType='https://schema.org/Event'>
                <td
                  itemProp='startDate'
                  content={format(new Date(event.startDate), 'Asia/Taipei', 'yyyy-MM-dd')}
                >
                  {format(new Date(event.startDate), 'Asia/Taipei', 'yyyy/MM/dd')}
                </td>
                <td
                  itemProp='endDate'
                  content={format(new Date(event.endDate), 'Asia/Taipei', 'yyyy-MM-dd')}
                >
                  {format(new Date(event.endDate), 'Asia/Taipei', 'yyyy/MM/dd')}
                </td>
                <td>
                  {(() => {
                    const isC4s = (event.name.link.title || '').includes('徵稿');
                    let link = event.name.link.source || '';

                    if (isC4s) {
                      link = event.callForSpeaker;
                    }

                    if (!event.name.link.title && event.name) {
                      return event.name;
                    }

                    return (
                      <Link
                        itemProp='url'
                        style={{ textDecoration: 'none', color: '#0070ff' }}
                        href={link}
                        rel='noreferrer nofollow'
                        target='_blank'
                      >
                        <span itemProp='name'>{event.name.link.title}</span>
                      </Link>
                    );
                  })()}
                </td>
                {(() => {
                  const now = Date.now();
                  let ticketTitle = '';

                  if (!event.ticket || event.ticket === '---') {
                    return <td></td>;
                  }

                  if (
                    now >= new Date(event.ticketStartTime).getTime() &&
                    now <= new Date(event.ticketEndTime).getTime() + 1
                  ) {
                    ticketTitle = 'Register Now';
                  } else if (now < new Date(event.ticketStartTime).getTime()) {
                    ticketTitle = 'Not Yet Started';
                  } else if (now > new Date(event.ticketEndTime).getTime() + 1) {
                    ticketTitle = 'End';
                  } else {
                    ticketTitle = 'NOT SURE';
                  }

                  return (
                    <td itemProp='offers' itemScope itemType='https://schema.org/Offer'>
                      <Link
                        itemProp='url'
                        style={{ textDecoration: 'none', color: '#0070ff' }}
                        href={event.ticket}
                        rel='noreferrer nofollow'
                        target='_blank'
                      >
                        {ticketTitle}
                      </Link>
                    </td>
                  );
                })()}
                <td>
                  {(() => {
                    const now = Date.now();
                    const link = isC4s ? event.callForSpeaker : '---';
                    let c4sTitle = '';

                    if (!isC4s) {
                      return null;
                    }

                    if (
                      now >= new Date(event.startDate).getTime() &&
                      now <= new Date(event.endDate).getTime() + 1
                    ) {
                      c4sTitle = 'Register Now';
                    } else if (now < new Date(event.startDate).getTime()) {
                      c4sTitle = 'Not Yet Started';
                    } else if (now > new Date(event.endDate).getTime() + 1) {
                      c4sTitle = 'End';
                    }

                    return (
                      <Link
                        style={{ textDecoration: 'none', color: '#0070ff' }}
                        href={event.callForSpeaker}
                        rel='noreferrer nofollow'
                        target='_blank'
                      >
                        {c4sTitle}
                      </Link>
                    );
                  })()}
                </td>

                {event.venue.link.source !== 'https://maps.google.com/?q=' ? (
                  <td itemProp='location' itemScope itemType='https://schema.org/Place'>
                    <Link
                      itemProp='url'
                      style={{ textDecoration: 'none', color: '#0070ff' }}
                      href={event.venue.link.source}
                      rel='noreferrer nofollow'
                      target='_blank'
                    >{`${event.oversea} ${event.venue.link.title}`}</Link>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ActivityListPage;
