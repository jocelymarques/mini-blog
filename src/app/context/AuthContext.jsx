"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            
            if (user) {
                user.getIdToken().then(token => {
                    document.cookie = `authToken=${token}; path=/; max-age=3600`;
                });
            } else {
                document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const value = {
        user,
        loading,
        auth
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => {
    return useContext(AuthContext);
};
