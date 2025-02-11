import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-end">
        <Navbar></Navbar>
      </div>
      <Sidebar></Sidebar>
      <div className="ml-60 mt-14 p-4 bg-neutral-100 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default layout;
