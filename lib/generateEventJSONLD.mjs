import { formatInTimeZone as format } from 'date-fns-tz';

const generateJSONLD = (events) => {
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

    let content = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.name.link.title,
      startDate: format(new Date(event.startDate), 'Asia/Taipei', 'yyyy/MM/dd'),
      endDate: format(new Date(event.endDate), 'Asia/Taipei', 'yyyy/MM/dd'),
    };

    if (event.venue.link.source) {
      content['location'] = {
        '@type': 'Place',
        url: event.venue.link.source,
        name: event.venue.link.title,
        address: event.venue.link.title,
      };
    }

    if (event.ticket) {
      content['offers'] = {
        '@type': 'AggregateOffer',
        name: ticketTitle,
        priceCurrency: event.oversea ? 'TWD' : 'USD',
        offers: [
          {
            '@type': 'Offer',
            url: event.ticket,
          },
        ],
      };
    }

    return content;
  });

  return jsonLd;
};

export default generateJSONLD;
