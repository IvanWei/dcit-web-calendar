import Link from 'next/link';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import { formatInTimeZone } from 'date-fns-tz';
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

const LinkComponent = (props) => {
  if (typeof props.data === 'string') {
    if (!props.data || props.data === '---') {
      return <div>Unknown</div>;
    }

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
              {!evt.title.includes('徵稿') && (
                <>
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

                        return `${formatInTimeZone(
                          new Date(ticketStartTime),
                          'Asia/Taipei',
                          'yyyy/MM/dd',
                        )} - ${formatInTimeZone(
                          new Date(ticketEndTime),
                          'Asia/Taipei',
                          'yyyy/MM/dd',
                        )}`;
                      }

                      return '---';
                    })()}
                  </div>
                </>
              )}
              {evt.title.includes('徵稿') && (
                <>
                  <div>
                    徵稿連結：
                    <LinkComponent data={evt.resource.callForSpeaker} />
                  </div>
                  <div>
                    徵稿日期：
                    {`${formatInTimeZone(
                      new Date(evt.start),
                      'Asia/Taipei',
                      'yyyy/MM/dd',
                    )} - ${formatInTimeZone(new Date(evt.end), 'Asia/Taipei', 'yyyy/MM/dd')}`}
                  </div>
                </>
              )}
            </div>
          ),
        });
      }}
      style={{ height: '95vh', marginTop: '20px' }}
      // onSelectSlot={({ start, end }) => {}}
      // eventPropGetter={}
    />
  );
};

export default MyCalendar;
