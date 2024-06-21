import classNames from 'classnames/bind';
import style from './style.module.scss';
import logo from '~public/logo.svg';
import Image from 'next/image';
import { fallbackLng, languages } from '~i18n/settings';
import { useTranslation } from '~i18n/index';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import GoogleSignInButton from '~/components/GoogleSignInButton';

const cx = classNames.bind(style);

interface IProps {
   params: {
      lng: string;
   };
}

export default async function Login({ params: { lng } }: IProps) {
   if (languages.indexOf(lng) < 0) lng = fallbackLng;
   const { t } = await useTranslation(lng, 'auth');

   return (
      <section className={cx('flex min-h-screen')}>
         <div className={cx('wrapper', 'block card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto')}>
            <div className={cx('inner', 'card-body')}>
               <div className={cx('header', 'w-full flex flex-col justify-center items-center')}>
                  <Image src={logo} alt="logo" className={cx('w-40')} />
                  <h3 className={cx('leading-10 mt-3 text-xl')}>{t('login with pass')}</h3>
               </div>
               <form className={cx('form-login', 'mt-3')}>
                  <div>
                     <input
                        className="input input-bordered w-full h-11 max-w-xs"
                        type="email"
                        placeholder={t('email')}
                     />
                     <input
                        className="input input-bordered w-full h-11 max-w-xs mt-3"
                        type="password"
                        placeholder={t('your pass')}
                     />

                     <div className={cx('mt-3 ml-1')}>
                        <input id="showpass" type="checkbox" />
                        <label className={cx('select-none ml-3')} htmlFor="showpass">
                           {t('show pass')}
                        </label>
                     </div>
                  </div>
                  <div className={cx('flex justify-between mt-6')}>
                     <Link href={'/register'} className={cx('btn btn-ghost btn-sm')}>
                        {t('create account')}
                     </Link>
                     <button type="button" className={cx('btn btn-primary btn-sm')}>
                        {t('login')}
                     </button>
                  </div>
               </form>
               <div className={cx('spreator-with-text', 'mt-6')}>{t('or')}</div>
               <div className={cx('option-login-list flex flex-col mt-3')}>
                  <GoogleSignInButton lng={lng} />
                  <button type="submit" className={cx('option-login-item', 'btn')}>
                     <FaFacebook className={cx('icon', 'icon-facbook')} />
                     <span>{t('facebook sigin')}</span>
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}
