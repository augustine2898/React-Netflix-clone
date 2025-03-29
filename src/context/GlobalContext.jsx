import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import requests from "../request";

// Create Context
export const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      console.log("Auth state changed. Current user:", currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup Function
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  // Login Function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      console.log("Logout function called");
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // Fetch random movie for banner
  useEffect(() => {
    async function fetchData() {
      const fullURL = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;
      const response = await fetch(fullURL);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      }
    }
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, movie, login, signup, logout, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
