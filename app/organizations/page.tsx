import { Metadata } from 'next';
import Link from 'next/link';
import TableStyle from '../../components/stylesheet/Table.module.css';

async function getStaticData() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=org',
  );
  const { data } = await res.json();

  return {
    title: data[0],
    data: data[1].table.rows,
  };
}

async function OrganizationsPage() {
  const { data } = await getStaticData();
  console.log('aaasss::');

  return (
    <>
      <h1 style={{ display: 'none' }}>活動組織列表 List of organization</h1>

      <table className={TableStyle.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Office Website</th>
            <th>Facebook</th>
          </tr>
        </thead>
        <tbody>
          {data.map((orgData, index) => {
            return (
              <tr key={index} itemScope itemType='https://schema.org/Organization'>
                <td itemProp='legalName'>{orgData.Name}</td>
                <td>
                  {orgData['Main Website'].link.source && (
                    <Link
                      itemProp='url'
                      style={{ textDecoration: 'none', color: '#0070ff' }}
                      href={orgData['Main Website'].link.source}
                      rel='noreferrer nofollow'
                      target='_blank'
                    >
                      {orgData['Main Website'].link.title}
                    </Link>
                  )}
                </td>
                <td>
                  {orgData.Facebook.link.source && (
                    <Link
                      itemProp='url'
                      style={{ textDecoration: 'none', color: '#0070ff' }}
                      href={orgData.Facebook.link.source}
                      rel='noreferrer nofollow'
                      target='_blank'
                    >
                      {orgData.Facebook.link.title}
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const description =
  'DCIT 行事曆記錄著與開發、維運、設計有關的研討會資訊。This records are Developer, DevOps, Design and etc. Conferences In Taiwan and the world.';

export const metadata: Metadata = {
  title: 'DCIT 登記在冊的活動組織',
  description,
  creator: 'Wei Hong-Lin',
  authors: [{ name: 'Wei Hong-Lin', url: 'https://blog.ivanwei.co' }],
  keywords: ['DCIT', 'Developer', 'Conference', 'Taiwan', 'Calendar', '行事曆'],
  openGraph: {
    title: 'DCIT 登記在冊的活動組織',
    siteName: 'DCIT 登記在冊的活動組織',
    description,
    url: 'https://dcit.ivanwei.co/organizations',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default OrganizationsPage;
