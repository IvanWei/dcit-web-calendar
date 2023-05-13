import Head from 'next/head';
import Link from 'next/link';
import TableStyle from '../components/stylesheet/Table.module.css';

export async function getStaticProps() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbxeVoHvVLXtQnHxsBIb9oUbwFoRrmg5L9_Hie6feqEhIRdoYk4/exec?type=org',
  );
  const { data } = await res.json();

  return {
    props: {
      title: data[0],
      data: data[1].table.rows,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

function HomePage({ data }) {
  return (
    <>
      <Head>
        <title>DCIT 列管的活動組織</title>
      </Head>

      <h1>活動組織列表 List of organization</h1>

      <table className={TableStyle.table} itemScope itemType='https://schema.org/Organization'>
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
              <tr key={index}>
                <td itemProp='legalName'>{orgData.Name}</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default HomePage;
