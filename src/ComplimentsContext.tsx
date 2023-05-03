// ComplimentsContext.tsx

import * as React from 'react';
import { createContext, useState } from 'react';

  interface Compliment {
  id?: string;
  content?: string;
  date?: Date;
  creatorId?: string;
}

interface ComplimentsProviderProps {
  children: React.ReactNode;
}

type ContextType = {
  compliments: Compliment[];
  setCompliments: React.Dispatch<React.SetStateAction<Compliment[]>>;
  sort: (compareFn?: (a: Compliment, b: Compliment) => number) => Compliment[];
  map: (callbackfn: (value: Compliment, index: number, array: Compliment[]) => JSX.Element, compliments: Compliment[]) => JSX.Element[];
};


export const ComplimentsContext = createContext<ContextType>({
  compliments: [], 
  setCompliments: () => { throw new Error('setCompliments is not implemented'); },
  sort: (compareFn?: (a: Compliment, b: Compliment) => number) => [],
  map: (callbackfn: (value: Compliment, index: number, array: Compliment[]) => JSX.Element) => [],
});

export const ComplimentsProvider: React.FC<ComplimentsProviderProps> = ({ children }) => {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
    console.log(Array.isArray(compliments));
  }, [compliments]);

  const contextValue: ContextType = {
    compliments,
    setCompliments,
    sort: (compareFn?: (a: Compliment, b: Compliment) => number) => {
      return compliments.sort(compareFn);
    },
    map: (callbackfn: (value: Compliment, index: number, array: Compliment[]) => JSX.Element) => {
      return compliments.map(callbackfn);
    },
  };  

  return (
    <ComplimentsContext.Provider value={contextValue}>
      {children}
    </ComplimentsContext.Provider>
  );
};


  