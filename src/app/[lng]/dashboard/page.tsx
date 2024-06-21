import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);
export default function Home() {
   return (
      <section>
         <div className={style.test}>Dashboard</div>
      </section>
   );
}
