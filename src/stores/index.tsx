'use client';
import { useContext, createContext, useState, useEffect, useRef } from 'react';
import { StoreApi } from 'zustand/vanilla';
import { UserStore, createUserStore, initUserStore } from './userStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '~/libs/firebase';

type CombinedStore = {
   userStore: StoreApi<UserStore>;
};

const CombinedStoreContext = createContext<CombinedStore | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const userStoreRef = useRef(createUserStore(initUserStore()));
   const [store, setStore] = useState<CombinedStore | undefined>(undefined);

   useEffect(() => {
      const auth = getAuth(firebaseApp);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
         userStoreRef.current.setState({ user: user });

         setStore({ userStore: userStoreRef.current });
      });

      return () => unsubscribe();
   }, []);

   if (!store) {
      setStore({ userStore: userStoreRef.current });
   }
   return <CombinedStoreContext.Provider value={store}>{children}</CombinedStoreContext.Provider>;
};

export const useCombinedStore = () => {
   const context = useContext(CombinedStoreContext);

   if (!context) {
      throw new Error('useCombinedStore must be used within a CombinedStoreProvider');
   }

   return context;
};
