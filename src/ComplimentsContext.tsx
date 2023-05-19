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
  [x: string]: any;
  compliments: Compliment[];
  setCompliments: React.Dispatch<React.SetStateAction<Compliment[]>>;
};


export const ComplimentsContext = createContext<ContextType>({
  compliments: [],
  setCompliments: () => { throw new Error('setCompliments is not implemented'); }
});

export const ComplimentsProvider: React.FC<ComplimentsProviderProps> = ({ children }) => {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
    console.log(Array.isArray(compliments));
  }, [compliments]);

  return (
    <ComplimentsContext.Provider value={{compliments, setCompliments}}>
      {children}
    </ComplimentsContext.Provider>
  );
};


  