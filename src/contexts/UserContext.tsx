import { useContext, createContext, ReactNode, useState } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

interface UserContextInterface {
  uid: string;
  setUid: (newUid: string) => void;
}

const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export function UserContextProvider({ children }: ContextProviderProps) {
  const [uid, setUid] = useState<string>('');

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
