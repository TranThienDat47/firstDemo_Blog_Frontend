'use server';
import { cookies } from 'next/headers';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

interface ISetCookies {
   name: string;
   value: string;
   httpOnly?: boolean;
   expires?: Date;
}

export const getCookie = async (name: string = '') => {
   cookies().get(name);
};

export const setCookie = async ({
   name = '',
   value = '',
   httpOnly = false,
   expires = new Date(Date.now() + MAX_AGE * 1000),
}: ISetCookies) => {
   cookies().set(name, value, {
      httpOnly,
      expires,
      path: '/',
   });
};

export const deleteCookie = async (name: string) => {
   cookies().set(name, '', {
      expires: new Date(0),
      path: '/',
   });
};
