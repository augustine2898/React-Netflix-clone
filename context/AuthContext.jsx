import { createContext, useContext, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'firebase/auth';
import { login, signup, logout } from '../firebase'; // Ensure these functions exist

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
