import classNames from 'classnames/bind';
import style from './style.module.scss';
import logo from '~public/logo.svg';
import Image from 'next/image';

const cx = classNames.bind(style);

export default function Home() {
   return (
      <section className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('header')}>
               <Image src={logo} alt="logo" />
            </div>
            <form className={cx('form-login')}>
               <div>
                  <input type="email" placeholder="" />
               </div>
            </form>
            <div className={cx('spreator-with-text')}>Hoặc</div>
            <div></div>
         </div>
      </section>
   );
}
