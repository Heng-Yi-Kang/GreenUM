import { BreadcrumbWithCustomSeparator } from "./Navbar";
import React, { type FC, type PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      
      <div className="bg-white"> 
        
        <header className="fixed top-0 left-0 right-0 z-10 
                           border-b border-gray-200 bg-white shadow-sm 
                           py-4 px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-7xl mx-auto">
            <BreadcrumbWithCustomSeparator />
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