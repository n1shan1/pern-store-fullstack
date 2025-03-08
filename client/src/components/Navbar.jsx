import React from "react";
import { ShoppingBag, ShoppingCartIcon } from "lucide-react";
import { Link, useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
const Navbar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  return (
    <div className="bg-base-100 opacity-70 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="h-9 w-9 text-primary" />
                <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  PERNSTORE
                </span>
              </div>
            </Link>
          </div>
          {/* right section */}
          <div className="flex items-center gap-4">
            <ThemeSelector />
            {isHomePage && (
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-base-200 transition-colors flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
                    8
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
