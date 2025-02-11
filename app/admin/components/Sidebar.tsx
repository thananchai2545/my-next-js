"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { menu } from "@/utils/admin/sidebar";
const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200 bg-white"
        aria-label="Sidebar"
      >
        <div className="h-14 px-4 flex items-center text-black">
          <Link
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              Flowbite
            </span>
          </Link>
        </div>
        <div className="h-full px-3 py-2 overflow-y-auto">
          <ul className="font-medium">
            {menu.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                    pathname === item.link ? "bg-gray-300 text-black " : ""
                  }`}
                >
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </a>
                <div className="border-b my-1"></div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
