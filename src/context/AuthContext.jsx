import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [firestoreUser, setFirestoreUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        
        const userDoc = doc(db, 'users', currentUser.uid); 
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setFirestoreUser(userSnapshot.data());
        } else {
          console.warn('No Firestore user data found!');
          setFirestoreUser(null);
        }
      } else {
        setFirestoreUser(null); 
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setFirestoreUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, firestoreUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
