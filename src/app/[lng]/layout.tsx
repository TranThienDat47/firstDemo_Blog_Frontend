import type { Metadata } from 'next';
import './globals.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { StoreProvider } from '~/stores';

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
      <html lang="en" suppressHydrationWarning={true}>
         <body>
            <StoreProvider>
               <Header lng={lng} />
               <main>{children}</main>
               <Footer />
            </StoreProvider>
         </body>
      </html>
   );
}
