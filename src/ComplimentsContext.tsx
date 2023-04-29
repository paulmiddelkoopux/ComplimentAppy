// ComplimentsContext.tsx

import * as React from 'react';

  interface Compliment {
  id?: string;
  content?: string;
  date?: Date;
  creatorId?: string;
}

export const ComplimentsContext = React.createContext<Compliment[]>([]);

export const ComplimentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compliments, setCompliments] = React.useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
  }, [compliments]);

  return (
    <ComplimentsContext.Provider value={compliments}>
      {children}
    </ComplimentsContext.Provider>
  );
};

  