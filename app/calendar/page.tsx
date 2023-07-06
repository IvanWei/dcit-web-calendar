"use client"

// import Head from 'next/head';
/*
  NOTE: 官方暫不建議在 client compontent 中使用 use
  https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#use-in-client-components
*/
import { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import useSWR from 'swr'

import Calendar from '../../components/Calendar';
import SearchIconStyle from '../../components/stylesheet/icons/Search.module.css';
import InputStyle from '../../components/stylesheet/Input.module.css';
import LinkStyle from '../../components/stylesheet/Link.module.css';

async function getStaticData() {
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

  return events;
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

const api:string = 'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api';
async function CalendarPage() {

  // const { data, error, isLoading } = useSWR('https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api', fetcher);
  // console.log('aaa::', data)

  // console.log('data:: ', data)
  // let events = []
  try {
    let events = await getStaticData();

    console.log("events::", events)

    // const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    console.log('filteredEvents:: ', filteredEvents, searchKeyword)

    return (
      <>
        {/*<Head>
          <title>DCIT 行事曆 (Calendar version)</title>
          <meta property='og:title' content='DCIT 行事曆 (Calendar version)' />
          <meta property='og:url' content='https://dcit.ivanwei.co/calendar' />
        </Head>*/}
        <h1 style={{display: 'none'}}>Developer Conferences in Taiwan (Calendar version)</h1>

        {/*<form
          className={[InputStyle['pure-form']].toString()}
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          <fieldset style={{ border: 0 }}>
            <i className={[SearchIconStyle['gg-search']].toString()}></i>
            <input
              type='text'
              name='search'
              placeholder='Search events...'
              // value={searchKeyword}
              style={{ paddingLeft: '2em', marginLeft: '-1.5em' }}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                evt.preventDefault();

                const filterValue: string = evt.target.value.trim();

                // setSearchKeyword(filterValue);
                // handleFilter(filterValue);
              }}
            />
            <button
              type='button'
              className={LinkStyle.link}
              style={{ background: 'rgb(158, 128, 128)', border: 0 }}
              onClick={(evt: MouseEventHandler<HTMLButtonElement>) => {
                evt.preventDefault();
                // handleClearFilter();
              }}
            >
              顯示全部
            </button>
          </fieldset>
        </form>*/}
        {/*<Calendar events={data} style='margin-top: 100px;' />*/}
      </>
    );

  } catch (error) {
    console.log('aaa:: ', error)
  }


  // function handleFilter(filterValue: string) {
  //   const filtered = events.filter((event) => {
  //     return event.title.toLowerCase().includes(filterValue.toLowerCase());
  //   });

  //   setFilteredEvents(filtered);
  // }

  // function handleClearFilter() {
  //   setSearchKeyword('');
  //   setFilteredEvents(events);
  // }

  // useEffect(() => {

  // }, []);


}

export default CalendarPage;
