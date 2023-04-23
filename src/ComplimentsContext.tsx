// ComplimentsContext.tsx

import * as React from 'react';

export const ComplimentsContext = React.createContext<Compliment[]>([]);

export const ComplimentsProvider: React.FC = ({ children }) => {
  const [compliments, setCompliments] = React.useState<Compliment[]>([]);

  React.useEffect(() => {
    console.log('Creating ComplimentsContext', compliments);
  }, [compliments]);

  return (
    <ComplimentsContext.Provider value={[compliments, setCompliments]}>
      {children}
    </ComplimentsContext.Provider>
  );
};
