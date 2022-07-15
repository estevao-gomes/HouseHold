import { useContext, createContext, ReactNode, useState } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

interface DateContextInterface {
  date: Date;
  UpdateDate: (newDate: Date) => void;
}

const DateContext = createContext<DateContextInterface>(
  {} as DateContextInterface
);

export function DateContextProvider({ children }: ContextProviderProps) {
  const [date, setDate] = useState(new Date(new Date().toDateString()));

  function UpdateDate(newDate: Date) {
    setDate(newDate);
  }

  return (
    <DateContext.Provider value={{ date, UpdateDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);
  return context;
}
