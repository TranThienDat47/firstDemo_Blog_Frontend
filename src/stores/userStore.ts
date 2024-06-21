import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserState {
   user: User | null;
   setUser: (user: User | null) => void;
   clearUser: () => void;
}

export const userStore = create<UserState>((set) => ({
   user: null,
   setUser: (user) => set({ user }),
   clearUser: () => set({ user: null }),
}));
