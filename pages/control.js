import Head from 'next/head';
import MainNavbar from '../components/main-navbar';
import Footer from '../components/footer';
import axios from 'axios';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

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

export default function Control() {
  const [state, setState] = useState();
  const [checker, setCheck] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    getControl();
  });

  const getControl = async () => {
    const response = await axios.get('http://api.projectiot.my.id/state');
    setState(response.data.data);
    if (state == '0') {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const setControl = async () => {
    if (checker == true) {
      state = '0';
    } else {
      state = '1'
    }
    const response = await axios.patch('http://api.projectiot.my.id/control', { state: state });
    setMessage(response.data.message);
    getControl();
  };

  return (
    <>
      <Head>
        <title>Control</title>
      </Head>
      <MainNavbar active="control" />
      <div className='bg-gray-50 mt-1 mx-1 rounded-lg p-5'>
        <h3 className="text-center font-bold text-xl">Control Device</h3>

        <div className="flex justify-center mt-10">

          <label
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={!checker ? ("") : ("1")}
              onClick={setControl}
            />

            <div className="w-28 h-16 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-14 after:w-14 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          </label>
        </div>
        <div className="flex justify-center font-semibold text-lg mt-3">State: {!checker ? ("OFF") : ("ON")}<svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill={!checker ? ("#db3b3b") : ("#3bdb3e")}
          className="bi bi-circle-fill mx-2 mt-1"
          viewBox="0 0 16 16"
        >
          <circle cx={8} cy={8} r={8} />
        </svg>
        </div>

        <p className='text-green-400 mt-5'>message: {message}</p>

        <Footer />
      </div>
    </>
  )
}