import { Feed } from 'feed';

// NOTE: https://github.com/garmeeh/next-seo/issues/209#issuecomment-597305549
const generateRSS = async () => {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=api',
  );
  const { data } = await res.json();
  let events = [];
  if (data) {
    events = data.filter(
      (event) =>
        (event.endDate && new Date(event.endDate).getTime() >= Date.now()) ||
        (event.ticketEndTime && new Date(event.ticketEndTime).getTime() >= Date.now()),
    );
  }

  const feed = new Feed({
    title: `Developer Conferences In Taiwan ${new Date().getFullYear()}`,
    description: 'DCIT daily',
    id: `${process.env.SITE_URL}/`,
    link: `${process.env.SITE_URL}/`,
    image: 'https://blog.ivanwei.co/images/2018/05/16/DCIT.png',
    favicon: `${process.env.SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} DCIT team. All rights reserved.`,
    generator: 'Feed for DCIT',
    feedLinks: {
      json: `${process.env.SITE_URL}/json`,
      atom: `${process.env.SITE_URL}/atom`,
    },
    author: {
      name: 'Wei Hong-Lin (aka Ivan Wei)',
      email: 'contact@ivanwei.co',
      link: 'https://about.me/ivan_wei',
    },
  });

  events.forEach((event, index) => {
    const isC4s = (event.name.link.title || '').includes('徵稿');

    const eventTitle = event.name.link.title ? event.name.link.title : event.name;
    const eventLink = event.name.link.source || '';

    feed.addItem({
      title: eventTitle,
      id: `${eventLink}?id=${index}`,
      link: eventLink,
      description: '',
      content: '',
      author: [
        {
          name: 'Wei Hong-Lin (aka Ivan Wei)',
          email: 'contact@ivanwei.co',
          link: 'https://about.me/ivan_wei',
        },
      ],
      date: new Date(),
    });
  });

  console.log(feed.rss2());
};

generateRSS();
