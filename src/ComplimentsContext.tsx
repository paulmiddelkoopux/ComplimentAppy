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
  [x: string]: ReactNode;
  sort(arg0: (a: any, b: any) => number): unknown;
  map(arg0: (compliment: { id: React.Key | null | undefined; content: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }) => JSX.Element): React.ReactNode;
  compliments: Compliment[]
  setCompliments: (c: Compliment) => void
}

export const ComplimentsContext = createContext<ContextType>({
  compliments: [], setCompliments: () => { },
  sort: function (arg0: (a: any, b: any) => number): unknown {
    throw new Error('Function not implemented.');
  },
  map: function (arg0: (compliment: { id: React.Key | null | undefined; content: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }) => JSX.Element): React.ReactNode {
    throw new Error('Function not implemented.');
  }
});
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

  