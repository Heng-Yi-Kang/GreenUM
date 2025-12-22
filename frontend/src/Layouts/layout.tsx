import { type FC, type PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { User, LogOut, LogIn as LogInIcon } from 'lucide-react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user, signOut, isAdmin } = useAuth();
  return (
    <>
      
      <div className="bg-white"> 
        
        <header className="fixed top-0 left-0 right-0 z-10 
                           border-b border-gray-200 bg-white shadow-sm 
                           py-4 px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end mr-1">
                    <span className="text-xs font-semibold text-gray-900 leading-none">{user.email?.split('@')[0]}</span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase mt-0.5 tracking-tight">
                      {isAdmin ? 'Administrator' : 'Community Member'}
                    </span>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg text-green-700">
                    <User className="w-5 h-5" />
                  </div>
                  <button 
                    onClick={() => signOut()}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all active:scale-95"
                >
                  <LogInIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        
        <main className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;