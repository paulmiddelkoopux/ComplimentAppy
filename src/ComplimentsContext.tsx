// ComplimentsContext.tsx

import * as React from 'react';
import { createContext, useState } from 'react';

  interface Compliment {
  id?: string;
  content?: string;
  date?: Date;
  creatorId?: string;
}

type ContextType = {
  compliments: Compliment[]
  setCompliments: (c: Compliment) => void
}

export const ComplimentsContext = createContext<ContextType>({compliments: [], setCompliments: () => {}});
// export const ComplimentsContext = React.createContext<Compliment[]>([]);

export const ComplimentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
    console.log(Array.isArray(compliments));
  }, [compliments]);

  return (
    <ComplimentsContext.Provider value={{ compliments, setCompliments}}>
      {children}
    </ComplimentsContext.Provider>
  );
};

  