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
  return (<>
    <Head>
      <title>DCIT</title>
    </Head>
    <div>
      <nav>
        <a className='link' style={{background: 'rgb(28, 184, 65)'}} href='https://dcit.ivanwei.co/' target='_blank' rel='ugc'>查詢今年活動 (總表)</a>
        <a className='link' style={{background: '#8058a5'}} href='/' rel='ugc'>查詢今年活動 (行事曆版)</a>
        <a className='link' style={{background: 'rgb(66, 184, 221)'}} href='https://dcit.ivanwei.co/organization' target='_blank' rel='ugc'>查看活動籌備單位</a>
        <a className='link' style={{background: 'rgb(223, 117, 20)'}} href='https://github.com/IvanWei/developer-conferences-in-taiwan/blob/master/data/list-of-organizations.json' target='_blank' rel='ugc nofollow'>新增活動籌備單位</a>
      </nav>
      <Calendar events={props.events} style="margin-top: 100px;" />
      <style jsx>{`
        .link {
          text-decoration: none;

          display: inline-block;
          cursor: pointer;
          padding: 5px;
          text-align: center;
          color: white;
          border-radius: 4px;
          text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
        }
        .link:not(:first-child) {
          margin-left: 10px;
        }
      `}</style>
    </div>
  </>)
}

export default HomePage
