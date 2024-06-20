import { Trans } from 'react-i18next/TransWithoutContext';
import { languages, fallbackLng } from '../i18n/settings';
import { useTranslation } from '../i18n';

interface IProps {
   params: {
      lng: string;
   };
}

export default async function Home({ params: { lng } }: IProps) {
   if (languages.indexOf(lng) < 0) lng = fallbackLng;
   const { t } = await useTranslation(lng);

   return (
      <>
         <Trans t={t} i18nKey="or">
            {t('welcome')}
         </Trans>
      </>
   );
}
