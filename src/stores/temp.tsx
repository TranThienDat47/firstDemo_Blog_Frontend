// 'use client';
// import { createContext, useContext, ReactNode, useEffect } from 'react';
// import { useUserStore, UserState } from './userStore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import firebaseApp from '~/libs/firebase';

// interface StoreContextProps {
//    userStore: UserState;
// }

// const defaultValue: StoreContextProps = {
//    userStore: {} as UserState,
// };

// export const StoreContext = createContext(defaultValue);

// export const StoreProvider = ({ children }: { children: ReactNode }) => {
//    const userStore = useUserStore();

//    useEffect(() => {
//       const auth = getAuth(firebaseApp);
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//          if (user) {
//             userStore.setUser(user);
//          } else {
//             userStore.setUser(null);
//          }
//       });

//       return () => unsubscribe();
//    }, []);

//    return <StoreContext.Provider value={{ userStore }}>{children}</StoreContext.Provider>;
// };
// export const useStore = () => useContext(StoreContext);

// export const useStore = <T,>(selector: (store: CounterStore) => T): T => {
//    const counterStoreContext = useContext(CounterStoreContext);

//    if (!counterStoreContext) {
//       throw new Error(`useCounterStore must be used within CounterStoreProvider`);
//    }

//    return useStore(counterStoreContext, selector);
// };
