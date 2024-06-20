import classNames from 'classnames/bind';
import style from './style.module.scss';
import logo from '~public/logo.svg';
import Image from 'next/image';
import { fallbackLng, languages } from '~/app/i18n/settings';
import { useTranslation } from '~/app/i18n';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const cx = classNames.bind(style);

interface IProps {
   params: {
      lng: string;
   };
}

export default async function Register({ params: { lng } }: IProps) {
   if (languages.indexOf(lng) < 0) lng = fallbackLng;
   const { t } = await useTranslation(lng, 'auth');

   return (
      <section className={cx('flex min-h-screen')}>
         <div className={cx('wrapper', 'block card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto')}>
            <div className={cx('inner', 'card-body')}>
               <div className={cx('header', 'w-full flex flex-col justify-center items-center')}>
                  <Image src={logo} alt="logo" className={cx('w-40')} />
                  <h3 className={cx('leading-10 mt-3 text-xl')}>{t('create account')}</h3>
               </div>
               <form className={cx('form-register', 'mt-3')}>
                  <div>
                     <input
                        className="input input-bordered w-full h-11 max-w-xs"
                        type="email"
                        placeholder={t('Email')}
                     />
                  </div>
                  <div className={cx('flex justify-between mt-6')}>
                     <Link href={'/auth/login'} className={cx('btn btn-ghost btn-sm')}>
                        {t('had account')}
                     </Link>
                     <button type="button" className={cx('btn btn-primary btn-sm')}>
                        {t('next')}
                     </button>
                  </div>
               </form>
               <div className={cx('spreator-with-text', 'mt-6')}>{t('or')}</div>
               <div className={cx('option-login-list flex flex-col mt-3')}>
                  <Link href={'#'} className={cx('option-login-item', 'btn')}>
                     <FcGoogle className={cx('icon')} />
                     <span>{t('google sigin')}</span>
                  </Link>
                  <Link href={'#'} className={cx('option-login-item', 'btn')}>
                     <FaFacebook className={cx('icon', 'icon-facbook')} />
                     <span>{t('facebook sigin')}</span>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
