import Head from 'next/head';
import nookies from 'nookies';
import MainNavbar from '../components/main-navbar';
import Footer from '../components/footer';
import {FaUserCircle} from 'react-icons/fa';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }

  return {
    props: {}
  }
}

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <MainNavbar active="profile" />
      <div className='p-5 mx-1 mt-1 rounded-lg bg-gray-50'>
          <div className='flex justify-center'>
            <FaUserCircle size={80}/>
          </div>
          <h4 className='mt-5 text-xl font-semibold text-center'>Deni</h4>
          <h4 className='text-lg font-semibold text-center '>160403010076</h4>
          <h4 className='mt-3 font-semibold text-center text-md'>Program Studi Teknik Informatika</h4>
          <h4 className='mt-1 font-semibold text-center text-md'>Universitas PGRI Kanjuruhan Malang</h4>

      <Footer />  
      </div>
      
    </>
  )
}