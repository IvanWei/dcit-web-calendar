import { formatInTimeZone as format } from 'date-fns-tz';

export default (events) => {
  const jsonLd = events.map((event) => {
    const now = Date.now();
    let ticketTitle = '';

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

    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "location": {
        "@type": "Place",
        "url": event.venue.link.source !== 'https://maps.google.com/?q='?event.venue.link.source:'',
        "name": event.venue.link.source !== 'https://maps.google.com/?q='?`${event.oversea} ${event.venue.link.title}`:'',
      },
      "name": event.name.link.title,
      "offers": {
        "@type": "Offer",
        "url": event.ticket,
        "name": ticketTitle,
      },
      "startDate": format(new Date(event.startDate), 'Asia/Taipei', 'yyyy/MM/dd'),
      "endDate": format(new Date(event.endDate), 'Asia/Taipei', 'yyyy/MM/dd'),
    };
  });

  return jsonLd;
}
