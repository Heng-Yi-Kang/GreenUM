import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
const AuthContext = createContext({
    user: null,
    isAdmin: false,
    loading: true,
    signIn: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => { },
});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!supabase.auth)
            return;
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            checkAdmin(currentUser);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
        // Listen for changes on auth state
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            checkAdmin(currentUser);
            setLoading(false);
        });
        return () => subscription?.unsubscribe();
    }, []);
    const checkAdmin = (user) => {
        if (!user) {
            setIsAdmin(false);
            return;
        }
        const isGreenumAdmin = user.email?.endsWith('@greenum.org') || user.user_metadata?.role === 'admin';
        setIsAdmin(!!isGreenumAdmin);
    };
    const signIn = async (credentials) => {
        const { error } = await supabase.auth.signInWithPassword(credentials);
        return { error };
    };
    const signUp = async (credentials) => {
        const { error } = await supabase.auth.signUp(credentials);
        return { error };
    };
    const signOut = async () => {
        await supabase.auth.signOut();
    };
    return (_jsx(AuthContext.Provider, { value: { user, isAdmin, loading, signIn, signUp, signOut }, children: !loading && children }));
};
export const useAuth = () => useContext(AuthContext);
