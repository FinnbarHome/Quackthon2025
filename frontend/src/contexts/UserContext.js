import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user data from localStorage on initial load
    const savedCredentials = localStorage.getItem("userCredentials");
    console.log("Initial load credentials:", savedCredentials);
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  });

  const updateUser = (userData) => {
    console.log("Updating user with:", userData);
    setUser(userData);
    localStorage.setItem("userCredentials", JSON.stringify(userData));
  };

  // Add this useEffect to monitor changes
  useEffect(() => {
    console.log("User context changed:", user);
  }, [user]);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
