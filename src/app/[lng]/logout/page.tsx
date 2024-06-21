'use client';

import { deleteCookie } from '~/libs/cookies';
import { useEffect } from 'react';
import { auth } from '~/libs/firebase';
import { useRouter } from 'next/navigation';

const Logout = () => {
   const router = useRouter();

   useEffect(() => {
      auth.signOut().then(() => {});
      deleteCookie('token');
      router.push('/');

      return () => {};
   }, []);

   return <></>;
};

export default Logout;
