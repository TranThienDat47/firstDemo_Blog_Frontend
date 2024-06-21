import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyCh8c8i0svENM7yZ9gKIGZIV3eh_TO27fY',
   authDomain: 'demoblog-21c4e.firebaseapp.com',
   projectId: 'demoblog-21c4e',
   storageBucket: 'demoblog-21c4e.appspot.com',
   messagingSenderId: '708773115702',
   appId: '1:708773115702:web:ae6522bd42711b2e652597',
   measurementId: 'G-LLGLDJ2E2K',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const logout = async () => {};

export default app;
