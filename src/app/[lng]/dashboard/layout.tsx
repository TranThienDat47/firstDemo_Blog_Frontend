import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { getCookie } from '~/libs/cookies';

export const metadata: Metadata = {
   title: 'ManledBlog',
   description: 'ManledBlog',
};

interface IProps {
   params: {
      lng: string;
   };
   children: any;
}

export default function DashBoardLayout({ params: { lng }, children }: Readonly<IProps>) {
   const headersList = headers();

   const domain = headersList.get('host') || '';
   const fullUrl = headersList.get('referer') || '';
   const pathName = fullUrl.replace(domain, '').split('///')[1];

   return (
      <section>
         <>{children}</>
      </section>
   );
}
