'use client';

import classNames from 'classnames/bind';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '~/libs/firebase';
import { FcGoogle } from 'react-icons/fc';
import style from './style.module.scss';
import { fallbackLng, languages } from '~i18n/settings';
import { useTranslation } from '~i18n/index';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '~/libs/cookies';
import { useCombinedStore } from '~/stores';

const cx = classNames.bind(style);

interface IProps {
   lng: string;
}

const GoogleSignInButton = ({ lng }: IProps) => {
   const [translation, setTranslation] = useState({ t: (key: string) => key });
   const { userStore } = useCombinedStore();

   useEffect(() => {
      const fetchTranslation = async () => {
         const { t } = await useTranslation(lng, 'auth');
         setTranslation({ t });
      };

      if (languages.indexOf(lng) < 0) {
         lng = fallbackLng;
      }

      fetchTranslation();
   }, [lng]);

   const router = useRouter();

   const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleAuthProvider)
         .then(async (result) => {
            userStore.getState().setUser(result.user);

            return await result.user.getIdToken();
         })
         .then((result) => {
            localStorage.setItem('token', result);

            setCookie({ name: 'token', value: JSON.stringify(result) });
            router.push('/');
         })
         .catch((error) => {});
   };

   return (
      <button onClick={handleGoogleSignIn} className={cx('option-login-item', 'btn')}>
         <FcGoogle className={cx('icon')} />
         <span>{translation.t('google sigin')}</span>
      </button>
   );
};

export default GoogleSignInButton;
