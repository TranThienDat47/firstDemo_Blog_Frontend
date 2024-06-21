import { Trans } from 'react-i18next/TransWithoutContext';
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

   return <section>{t('welcome')}</section>;
}
