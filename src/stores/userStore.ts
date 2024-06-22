// ~/stores/userStore.ts

import { createStore, StoreApi } from 'zustand/vanilla';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import firebaseApp from '~/libs/firebase';

export type UserState = {
   user: User | null;
};

export type UserActions = {
   setUser: (user: User | null) => void;
   clearUser: () => void;
};

export const initUserStore = (): UserState => {
   const auth = getAuth(firebaseApp);
   let initialUser: User | null = null;

   onAuthStateChanged(auth, (user) => {
      initialUser = user;
   });

   return { user: initialUser };
};

export const defaultUserState: UserState = {
   user: null,
};

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState = defaultUserState) => {
   return createStore<UserStore>((set) => ({
      ...initState,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
   }));
};
