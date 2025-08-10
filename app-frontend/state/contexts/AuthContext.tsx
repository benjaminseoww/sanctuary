import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useRouter } from "expo-router"

interface UserSession {
  user_id: number;
  tokens: string[];
}

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (username: string, password: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const router = useRouter();

  return (
    <AuthContext.Provider
      value={{
        signIn: (username: string, password: string) => {

          // call login from backend 


          // get the response and check it 


          // if successful, set the session
          const session: UserSession = {
            user_id: 1,
            tokens: ['xxx', 'yyy']
          }
          // Perform sign-in logic here
          setSession(JSON.stringify(session));
          router.replace('/(main)/(tabs)/home/collections');
        },
        signOut: () => {
          setSession(null);
          router.replace('/(auth)');
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
