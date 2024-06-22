import Link from 'next/link';
import { useTranslation } from '~i18n/index';
import { fallbackLng, languages } from '~i18n/settings';

interface IProps {
   params: {
      lng: string;
   };
}

export default async function Home({ params: { lng } }: IProps) {
   if (languages.indexOf(lng) < 0) lng = fallbackLng;
   const { t } = await useTranslation(lng);

   return (
      <section className={'flex items-center justify-center h-screen flex-col'}>
         <h2>{t('welcome')}</h2>
         <Link href={'/dashboard'} className={'btn text-center mt-9'}>
            Dashboard
         </Link>
      </section>
   );
}
