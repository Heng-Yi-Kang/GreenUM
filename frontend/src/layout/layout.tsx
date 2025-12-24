import { type FC, type PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { User, LogOut, LogIn as LogInIcon } from "lucide-react";
import { BreadcrumbWithCustomSeparator } from "./Navbar";
import { ModeToggle } from "../components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user, signOut, isAdmin } = useAuth();
  return (
    <>
      <div className="bg-white dark:bg-gray-950">
        <header
          className="fixed top-0 left-0 right-0 z-10
                           border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm
                           py-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <BreadcrumbWithCustomSeparator />

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end mr-1">
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-none">
                      {user.email?.split("@")[0]
                        ? user.email.split("@")[0].charAt(0).toUpperCase() +
                          user.email.split("@")[0].slice(1)
                        : ""}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 tracking-tight">
                      {isAdmin ? "Administrator" : "Community Member"}
                    </span>
                  </div>

                  <Link
                    to="/going"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 mr-2 transition-colors"
                  >
                    Going
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="bg-green-100 dark:bg-green-900 p-2 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-all">
                        <User className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        variant="destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              <ModeToggle />
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
