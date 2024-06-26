'use client';
import { usePathname } from 'next/navigation';

function Footer() {
   const pathname = usePathname();

   const isAuthRoute = pathname.match(/^\/\w+\/(login|register)$/);

   if (isAuthRoute) {
      return null;
   }
   return <footer></footer>;
}

export default Footer;
