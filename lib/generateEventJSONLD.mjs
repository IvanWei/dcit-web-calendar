import { formatInTimeZone as format } from 'date-fns-tz';

const generateJSONLD = (events) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: process.env.SITE_URL || 'http://localhost:8080',
    copyrightYear: new Date().getFullYear(),
    creativeWorkStatus: 'Published',
    keywords: {
      '@context': 'https://schema.org/',
      '@type': 'DefinedTerm',
      name: 'DCIT 行事曆 ( Developer Conferences In Taiwan )',
      termCode: '51-6042.00',
      description: 'Developer Conferences In Taiwan, aka DCIT and DCIT 行事曆',
      inDefinedTermSet: 'http://onetonline.org',
    },
    maintainer: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      email: 'contact(at)ivanwei.co',
      member: [
        {
          '@type': 'Person',
          name: 'Wei Hong-Lin',
        },
      ],
      name: 'DCIT team',
    },
    sameAs: [
      'https://www.facebook.com/people/0-%E5%87%B8-1-%E9%96%92%E8%A9%B1%E5%8A%A0%E9%95%B7/100083322877946/',
      'https://github.com/IvanWei/dcit-web-calendar',
      'https://github.com/IvanWei/developer-conferences-in-taiwan',
    ],
    subjectOf: events.map((event) => {
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
    }),
  };

  return jsonLd;
};

export default generateJSONLD;
