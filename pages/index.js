import Head from 'next/head';
import MainNavbar from '../components/main-navbar';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import nookies from 'nookies';
import axios from 'axios';
import {BiRightArrowAlt} from 'react-icons/bi';
import {IoCloseSharp} from 'react-icons/io';

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

export default function Home() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  if(month.length == 1){
    month = `0${month}`;
  }
  let year = date.getFullYear();
  var today = `${year}-${month}-${day}`;
  const [clear, setClear] = useState();
  const [data, setData] = useState([]);
  const [tgl, setTgl] = useState();
  let num = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    const response = await axios.get('http://api.projectiot.my.id/get-all');
    setData(response.data.data);
  };
  
  const getDataByDate = async () => {
    const response = await axios.get(`http://api.projectiot.my.id/get-bydate/${tgl}`);
    console.log(today);
    setData(response.data.data);
  };

  const clearData = async () => {
    const response = await axios.get('http://api.projectiot.my.id/clear');
    setClear(!clear)
    getData();
  };
  return (
    <>
      <Head>
        <title>Report</title>
      </Head>

      <MainNavbar active="home" />
      <div className="w-full mx-1 mt-1 rounded-lg bg-gray-50">

        <h3 className="py-6 text-2xl font-semibold text-center text-gray-900">Report Data</h3>
        <div className="flex justify-between mb-5">
          <div className="flex mx-2">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              placeholder="Select date"
              value={tgl}
              onChange={(e) => setTgl(e.target.value)}
            />
            <button type='button' onClick={() => getDataByDate()} className='ml-3 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-7 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"'>
              <BiRightArrowAlt/>
            </button>
          </div>
          <button type="button" onClick={() => setClear(!clear)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-7 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear</button>
          {!clear ? (
            ""
          ) : (
            <div
              id="popup-modal"
              tabIndex={-1}
              className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-70 md:inset-0 h-modal md:h-full"
              aria-modal="true"
              role="dialog"
            >
              <div className="relative w-full h-full max-w-md p-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="popup-modal"
                    onClick={() => setClear(!clear)}
                  >
                    <IoCloseSharp/>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to clear data?
                    </h3>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => clearData()}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => setClear(!clear)}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative overflow-x-auto">
          <table className="mx-2 text-sm text-left text-gray-500 sm:w-full dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">
                  No.
                </th>
                <th scope="col" className="px-3 py-3">
                  Sensor1
                </th>
                <th scope="col" className="px-3 py-3">
                  Sensor2
                </th>
                <th scope="col" className="px-3 py-3">
                  Time
                </th>
                <th scope="col" className="px-3 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt) => (
                <tr key={dt.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {num++}
                  </th>
                  <td className="px-3 py-4">{dt.sen1}</td>
                  <td className="px-3 py-4">{dt.sen2}</td>
                  <td className="px-3 py-4">{dt.time}</td>
                  <td className="px-3 py-4">{dt.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  )
}
