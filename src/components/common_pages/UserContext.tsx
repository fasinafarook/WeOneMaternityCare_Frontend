import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  role: 'user' | 'serviceProvider' | null;
  setRole: (role: 'user' | 'serviceProvider' | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = React.useState<'user' | 'serviceProvider' | null>(null);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
