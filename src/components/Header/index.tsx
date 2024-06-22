'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { fallbackLng, languages } from '~/libs/i18n/settings';
import { useTranslation } from '~/libs/i18n';
import Link from 'next/link';
import { useCombinedStore } from '~/stores';

interface IProps {
   lng: string;
}

const Header: React.FC | any = ({ lng }: IProps) => {
   const pathname = usePathname();

   const isAuthRoute = pathname.match(/^\/\w+\/(login|register)$/);

   if (isAuthRoute) {
      return null;
   }

   const [translation, setTranslation] = useState({ t: (key: string) => key });

   useEffect(() => {
      if (!translation) {
         const fetchTranslation = async () => {
            const { t } = await useTranslation(lng, 'header');
            setTranslation({ t });
         };

         fetchTranslation();
      }

      if (languages.indexOf(lng) < 0) {
         lng = fallbackLng;
      }
   }, [lng]);

   const { userStore } = useCombinedStore();

   return (
      <header>
         <div className="navbar bg-base-100">
            <div className="flex-none">
               <button className="btn btn-square btn-ghost">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     className="inline-block w-5 h-5 stroke-current"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                     ></path>
                  </svg>
               </button>
            </div>
            <div className="">
               <Link href="/" className="btn btn-ghost text-xl">
                  daisyUI
               </Link>
            </div>
            <div className="flex flex-1 flex items-center justify-center">
               <form className="form-control ml-2 w-full max-w-md h-9">
                  <div className="flex">
                     <label
                        htmlFor="search-dropdown"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                     >
                        Your Email
                     </label>
                     <div className="relative w-full">
                        <input
                           type="search"
                           id="search-dropdown"
                           className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                           placeholder="Search Mockups, Logos, Design Templates..."
                           required
                        />
                        <button
                           type="submit"
                           className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                           <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                           >
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                           </svg>
                           <span className="sr-only">Search</span>
                        </button>
                     </div>
                  </div>
               </form>
            </div>
            <div className="flex-none gap-2">
               <div className="dropdown dropdown-end">
                  {!!userStore.getState().user ? (
                     <>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                           <div className="w-10 rounded-full">
                              <img
                                 alt="Tailwind CSS Navbar component"
                                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                              />
                           </div>
                        </div>
                        <ul
                           tabIndex={0}
                           className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                           <li>
                              <a className="justify-between">
                                 Profile
                                 <span className="badge">New</span>
                              </a>
                           </li>
                           <li>
                              <a>Settings</a>
                           </li>
                           <li>
                              <a href={'/logout'}>Logout</a>
                           </li>
                        </ul>
                     </>
                  ) : (
                     <a href={'/login'} className="btn btn-ghost">
                        {translation.t('Login')} / {translation.t('Register')}
                     </a>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
