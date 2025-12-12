import { BreadcrumbWithCustomSeparator } from "./Navbar";
import React, { type FC, type PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <BreadcrumbWithCustomSeparator />
      <main>{children}</main>
    </>
  );
};

export default Layout;
