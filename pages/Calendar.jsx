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

const LinkComponent = (props) => {
  if (typeof props.data === 'string') {
    if (props.data === '---') {
      return props.data;
    } else {
      return <a style={{textDecoration: 'none', color: '#0070ff'}} href={props.data}
        rel='noreferrer nofollow' target='_blank'
      >
        {props.data}
      </a>
    }
  }

  return (
    <a style={{textDecoration: 'none', color: '#0070ff'}} href={props.data.link.source}
      rel='noreferrer nofollow' target='_blank'
    >
      {props.data.link.title}
    </a>
  );
}

const MyCalendar = (props) => {
  return (<div>
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
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(evt) => {
        NewSwal.fire({
          title: (<p>{evt.title}</p>),
          html: (<div style={{textAlign: 'left'}}>
            <div>Flag：{evt.resource.flag}</div>
            <div>活動地點：
              <span style={{marginRight: 10}}>{evt.resource.oversea}</span>
              <LinkComponent data={evt.resource.venue} />
            </div>
            <div>售票連結：<LinkComponent data={evt.resource.ticket} /></div>
            <div>售票日期：{(() => {
              if (evt.resource.ticket === '---') {
                return '---';
              }
              if (evt.resource.ticketStartTime) {
                const {ticketStartTime, ticketEndTime} = evt.resource;

                return `(${format(new Date(ticketStartTime), 'yyyy/MM/dd')} - ${format(new Date(ticketEndTime), 'yyyy/MM/dd')})`;
              }

              return '---';
            })()}</div>
            {evt.title.indexOf('徵稿') > -1 && <div>徵稿連結：<LinkComponent data={evt.resource.callForSpeaker} /></div>}
            {evt.title.indexOf('徵稿') > -1 && <div>徵稿日期：{`${format(new Date(evt.start), 'yyyy/MM/dd')} - ${format(new Date(evt.end), 'yyyy/MM/dd')}`}</div>}
          </div>)
        });
      }}
      style={{ height: '95vh' }}
      onSelectSlot={({ start, end }) => {

      }}
      // eventPropGetter={}
    />
  </div>);
}

export default MyCalendar
