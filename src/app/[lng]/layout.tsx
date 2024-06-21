import type { Metadata } from 'next';
import './globals.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

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

export default function RootLayout({ params: { lng }, children }: Readonly<IProps>) {
   return (
      <html suppressHydrationWarning={true}>
         <body>
            <Header lng={lng} />
            {children}
            <Footer />
         </body>
      </html>
   );
}
