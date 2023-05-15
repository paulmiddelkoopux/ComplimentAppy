// ComplimentsContext.tsx

import * as React from 'react';
import { createContext, useState } from 'react';

export interface Compliment {
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
};


export const ComplimentsContext = createContext<ContextType>({
  compliments: [],
  setCompliments: () => { throw new Error('setCompliments is not implemented'); },
  sort: (_compareFn?: (a: Compliment, b: Compliment) => number) => [],
});

export const ComplimentsProvider: React.FC<ComplimentsProviderProps> = ({ children }) => {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
    console.log(Array.isArray(compliments));
  }, [compliments]);

  const sort = (compareFn?: (a: Compliment, b: Compliment) => number) => {
    return [...compliments].sort(compareFn);
  };

  const contextValue: ContextType = {
    compliments,
    setCompliments,
    sort,
  };

  return (
    <ComplimentsContext.Provider value={contextValue}>
      {children}
    </ComplimentsContext.Provider>
  );
};
