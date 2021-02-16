import Head from 'next/head';
import Calendar from '../components/Calendar';

export async function getStaticProps() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api');
  const {data} = await res.json();

  let events = [];

  if (data) {
    events = data.map((event) => ({
      title: (typeof event.name === 'string'?event.name:event.name.link.title),
      start: event.startDate,
      end: event.endDate,
      resource: {
        flag: event.flag,
        link: (typeof event.name === 'string'?null:event.name.link.source),
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
  }
}

function HomePage(props) {
  return (<div>
    <Head>
      <title>DCIT</title>
    </Head>
    <Calendar events={props.events} />
  </div>)
}

export default HomePage
