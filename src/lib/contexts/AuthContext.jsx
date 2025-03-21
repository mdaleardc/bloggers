"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const [user, setUser]= useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>{
      setIsloading(true);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
        setIsloading(false);
    })
      return () => unsub();
  }, [])
  
  const handleSigninWithGoogle= async () => {
    setIsloading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsloading(false);
    }
  }
  
  const handleLogout = async () => {
    setIsloading(true);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsloading(false);
    }
  }
  
  return (
    <AuthContext.Provider
    value={{
      user,
      isLoading,
      error,
      handleSigninWithGoogle,
      handleLogout,
    }}>
    {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);