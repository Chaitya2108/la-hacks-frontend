import React, { createContext, useContext, useState, ReactNode} from 'react';

interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (username: string) => void;
    logout: () => void; // Function to update context after login
    username: string | null; // Username property
    setUserName: React.Dispatch<React.SetStateAction<string | null>>; // Setter for username

  }

  
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children:ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username,setUserName] = useState<string | null>(null);

    const login = (username:string) => {
      setIsLoggedIn(true);
      setUserName(username)
    }

    const logout = () => {
      setIsLoggedIn(false);
      setUserName(null);
    }
    // Provide the context value to children
    return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUserName, login,logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Define the useAuth hook to access the context value
  export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };