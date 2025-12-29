import { type FC, type PropsWithChildren } from "react";
import { BreadcrumbWithCustomSeparator } from "./Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Events Sub-Navigation */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <BreadcrumbWithCustomSeparator />
        </div>
      </div>

      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
