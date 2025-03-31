import {useEffect, useState} from 'react';
import { SiBuzzfeed } from "react-icons/si";
import { PiPlantFill } from "react-icons/pi";
import Forecast from './forcast';
import NewListing from './newListing';
import MyListings from './myListings';
import SellerOrders from './sellerOrders';

const Farmer = () => {
  // Set the default active section to 'welcome'
  const [activeSection, setActiveSection] = useState('welcome');

  return (
    <div className="flex flex-row">
      <div>
        <div
          id="default-sidebar"
          className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-emerald-500">
            <ul className="space-y-2 font-medium">
              <li onClick={() => setActiveSection('makeNewListing')}>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-black group">
                  <PiPlantFill />
                  <span className="ms-3">Make New Listing</span>
                </a>
              </li>
              <li onClick={() => setActiveSection('myListings')}>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-black group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="ms-3">My Listings</span>
                </a>
              </li>
              <li onClick={() => setActiveSection('orders')}>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-black group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                </a>
              </li>
              <li onClick={() => setActiveSection('farmForcaster')}>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-black group">
                  <SiBuzzfeed />
                  <span className="flex-1 ms-3 whitespace-nowrap">Farm Forcaster</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-black rounded-full">
                    !
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        {activeSection === 'welcome' && (
          <div className="mt-[10rem] ml-[17rem] bg-white shadow-2xl rounded-xl border-4 border-solid border-slate-100">
            <div className="flex flex-row mx-[5rem] max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="flex flex-col justify-center items-center mt-1 me-6">
                <div className="relative w-[20px] h-[20px] bg-indigo-500 rounded-xl" />
                <div className="relative w-[5px] h-[80px] bg-gradient-to-b from-indigo-500 via-emerald-500 via-50%" />
              </div>
              <div>
                <h1 className="text-2xl text-black font-bold text-center mb-4">
                  Welcome to the{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-indigo-500 bg-clip-text text-transparent">
                    Farmer's Dashboard
                  </span>
                </h1>
                <p>Click on the options on the left to get started!</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'farmForcaster' && <Forecast />}
        {activeSection === 'orders' && <SellerOrders />}
        {activeSection === 'makeNewListing' && <NewListing />}
        {activeSection === 'myListings' && <MyListings />}
      </div>
    </div>
  );
};

export default Farmer;