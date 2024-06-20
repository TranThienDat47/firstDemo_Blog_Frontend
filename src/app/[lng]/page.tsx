import { Trans } from 'react-i18next/TransWithoutContext';
import { languages, fallbackLng } from '../i18n/settings';
import { useTranslation } from '../i18n';

export default async function Home({
   params: { lng },
}: {
   params: {
      lng: string;
   };
}) {
   if (languages.indexOf(lng) < 0) lng = fallbackLng;
   const { t } = await useTranslation(lng);

   return (
      <>
         <Trans t={t} i18nKey="welcome">
            {t('welcome')}
         </Trans>
      </>
   );
}
