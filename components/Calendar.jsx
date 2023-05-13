import Link from 'next/link';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const NewSwal = withReactContent(Swal);
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export async function getStaticProps() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api',
  );
  const { data } = await res.json();

  let events = [];

  if (data) {
    events = data.map((event) => ({
      title: typeof event.name === 'string' ? event.name : event.name.link.title,
      start: event.startDate,
      end: event.endDate,
      resource: {
        flag: event.flag,
        link: typeof event.name === 'string' ? null : event.name.link.source,
        oversea: event.oversea,
        venue: event.venue,
        callForSpeaker: event.callForSpeaker,
        ticket: event.ticket,
        ticketStartTime: event.ticketStartTime,
        ticketEndTime: event.ticketEndTime,
      },
    }));
  }

  return {
    props: {
      events,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

const LinkComponent = (props) => {
  if (typeof props.data === 'string') {
    if (!props.data || props.data === '---') {
      return 'Unknown';
    } else {
      return (
        <Link
          style={{ textDecoration: 'none', color: '#0070ff' }}
          href={props.data}
          rel='noreferrer nofollow'
          target='_blank'
        >
          {props.data}
        </Link>
      );
    }
  }

  return (
    <Link
      style={{ textDecoration: 'none', color: '#0070ff' }}
      href={props.data.link.source}
      rel='noreferrer nofollow'
      target='_blank'
    >
      {props.data.link.title}
    </Link>
  );
};

const MyCalendar = (props) => {
  return (
    <div>
      <Calendar
        popup
        selectable
        localizer={localizer}
        events={(props.events || []).map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          resource: event.resource,
        }))}
        startAccessor='start'
        endAccessor='end'
        onSelectEvent={(evt) => {
          NewSwal.fire({
            title: <p>{evt.title}</p>,
            html: (
              <div style={{ textAlign: 'left' }}>
                {evt.resource.flag && <div>Flag：{evt.resource.flag}</div>}
                {evt.resource.link && (
                  <div>
                    活動官網：
                    <Link
                      style={{ textDecoration: 'none', color: '#0070ff' }}
                      href={evt.resource.link}
                      rel='noreferrer nofollow'
                      target='_blank'
                    >
                      Link
                    </Link>
                  </div>
                )}
                <div>
                  活動地點：
                  <span style={{ marginRight: 10 }}>{evt.resource.oversea}</span>
                  <LinkComponent data={evt.resource.venue} />
                </div>
                {!evt.title.includes('徵稿') && <>
                  <div>
                    售票連結：
                    <LinkComponent data={evt.resource.ticket} />
                  </div>
                  <div>
                    售票日期：
                    {(() => {
                      if (evt.resource.ticket === '---') {
                        return '---';
                      }
                      if (evt.resource.ticketStartTime) {
                        const { ticketStartTime, ticketEndTime } = evt.resource;

                        return `${format(new Date(ticketStartTime), 'yyyy/MM/dd')} - ${format(
                          new Date(ticketEndTime),
                          'yyyy/MM/dd',
                        )}`;
                      }

                      return '---';
                    })()}
                  </div>
                </>}
                {evt.title.includes('徵稿') && <>
                  <div>
                    徵稿連結：
                    <LinkComponent data={evt.resource.callForSpeaker} />
                  </div>
                  <div>
                    徵稿日期：
                    {`${format(new Date(evt.start), 'yyyy/MM/dd')} - ${format(
                      new Date(evt.end),
                      'yyyy/MM/dd',
                    )}`}
                  </div>
                </>}
              </div>
            ),
          });
        }}
        style={{ height: '95vh', marginTop: '20px' }}
        onSelectSlot={({ start, end }) => {}}
        // eventPropGetter={}
      />
    </div>
  );
};

export default MyCalendar;
