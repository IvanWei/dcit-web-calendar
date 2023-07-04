import Link from 'next/link';
import FooterStyle from '../stylesheet/Footer.module.css';

const Footer = () => {
  return (
    <footer className={FooterStyle['footer-basic']}>
      Copyright &copy; {new Date().getFullYear()} DCIT team (維護者：{' '}
      <Link href='mailto:contact@ivanwei.co'>Wei Hong-Lin</Link>) 保留一切權利。 (最後更新: {process.env.NEXT_PUBLISH_VERSION})
    </footer>
  );
};

export default Footer;
