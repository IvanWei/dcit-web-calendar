import Link from 'next/link';
import Image from 'next/image';
import LinkStyle from '../stylesheet/Link.module.css';

import feedImg from '../../public/feed-icon.png';

const Navbar = () => {
  const thisYear = new Date().getFullYear();

  return (
    <nav style={{ display: 'flex' }}>
      <Link
        className={LinkStyle.link}
        style={{ background: 'rgb(28, 184, 65)' }}
        href='/'
        rel='ugc'
      >
        {thisYear} 活動列表
      </Link>
      <Link className={LinkStyle.link} style={{ background: '#8058a5' }} href='/calendar' rel='ugc'>
        {thisYear} 活動列表 (行事曆版)
      </Link>
      <Link
        className={LinkStyle.link}
        style={{ background: 'rgb(66, 184, 221)' }}
        href='/organizations'
        rel='ugc'
      >
        活動組織列表
      </Link>
      <Link
        className={LinkStyle.link}
        style={{ background: 'rgb(223, 117, 20)' }}
        href='https://github.com/IvanWei/developer-conferences-in-taiwan/wiki'
        target='_blank'
        rel='ugc external nofollow'
      >
        About DCIT
      </Link>
      <Link
        className={LinkStyle.link}
        style={{ padding: 0, maxHeight: '32.5px' }}
        href='/rss.xml'
        target='_blank'
        rel='ugc external nofollow'
      >
        <Image src={feedImg.src} width={32.5} height={32.5} alt='atom feed' />
        {/*RSS*/}
      </Link>
    </nav>
  );
};

export default Navbar;
