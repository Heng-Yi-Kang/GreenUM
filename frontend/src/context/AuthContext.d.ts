import React from 'react';
import type { User } from '@supabase/supabase-js';
interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
