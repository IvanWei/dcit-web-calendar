import Head from 'next/head';
import Link from 'next/link';
import format from 'date-fns/format';
import TableStyle from '../components/stylesheet/Table.module.css';

export async function getStaticProps() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api',
  );
  const { data } = await res.json();

  let events = [];

  if (data) {
    events = data.filter(
      (event) =>
        (event.startDate && new Date(event.startDate).getFullYear() >= new Date().getFullYear()) ||
        (event.ticketStartTime &&
          new Date(event.ticketStartTime).getFullYear() >= new Date().getFullYear()),
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
        <meta property='og:type' content='video.movie' />
        <meta property='og:url' content='https://dcit.ivanwei.co' />
      </Head>

      <h1>Developer Conferences in Taiwan (List version)</h1>
      <table className={TableStyle.table} itemScope itemType='https://schema.org/Event'>
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
        <tbody>
          {events.map((event, index) => {
            const isC4s = (event.name.link.title || '').includes('徵稿');
            let link = event.name.link.source || '';

            return (
              <tr key={index}>
                <td itemProp='startDate' content={format(new Date(event.startDate), 'yyyy-MM-dd')}>
                  {format(new Date(event.startDate), 'yyyy/MM/dd')}
                </td>
                <td itemProp='endDate'>{format(new Date(event.endDate), 'yyyy-MM-dd')}</td>
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
                <td itemProp='offers' itemScope itemType='https://schema.org/Offer'>
                  {(() => {
                    const now = Date.now();
                    let ticketTitle = '';

                    if (!event.ticket || event.ticket === '---') {
                      return null;
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
                      ticketTitle = 'UNKNOWN';
                    }

                    return (
                      <Link
                        itemProp='url'
                        style={{ textDecoration: 'none', color: '#0070ff' }}
                        href={event.ticket}
                        rel='noreferrer nofollow'
                        target='_blank'
                      >
                        {ticketTitle}
                      </Link>
                    );
                  })()}
                </td>
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
                <td itemProp='location' itemScope itemType='https://schema.org/Place'>
                  {event.venue.link.source !== 'https://maps.google.com/?q=' && (
                    <Link
                      itemProp='url'
                      style={{ textDecoration: 'none', color: '#0070ff' }}
                      href={event.venue.link.source}
                      rel='noreferrer nofollow'
                      target='_blank'
                    >{`${event.oversea} ${event.venue.link.title}`}</Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ActivityListPage;
