import Head from 'next/head';
import Link from 'next/link';
import Calendar from '../components/Calendar';
import { useState } from 'react';

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
    // revalidate: 1, // In seconds
  };
}

function HomePage(props) {

  const [filteredEvents, setFilteredEvents] = useState(props.events);

  // Function to handle filtering based on user input or conditions
  const handleFilter = (filterValue) => {
    // Perform filtering logic here based on your requirements
    const filtered = props.events.filter((event) => {
      // Example: Filtering based on the event title containing the filterValue
      return event.title.toLowerCase().includes(filterValue.toLowerCase());
    });

    setFilteredEvents(filtered);
  };

  return (
    <>
      <Head>
        <title>DCIT 行事曆 (Calendar version)</title>
        <meta property='og:title' content='DCIT 行事曆 (Calendar version)' />
        <meta property='og:url' content='https://dcit.ivanwei.co/calendar' />
      </Head>
      <h1>Developer Conferences in Taiwan (Calendar version)</h1>
      <input
        type='text'
        placeholder='Search events...'
        onChange={(e) => handleFilter(e.target.value)}
      />

      <Calendar events={filteredEvents} style='margin-top: 100px;' />
    </>
  );
}

export default HomePage;
