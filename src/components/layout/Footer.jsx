"use client";

import {
  MdHome,
  MdPerson,
  MdOutlineFace,
  MdContacts,
  MdMap,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md rounded-t-lg">
      <div className="flex justify-between items-center p-3">
        <div className="flex w-1/4 justify-center">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center hover:text-blue-300 transition-colors duration-500 ${
              isActive("/dashboard") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <MdHome className="text-2xl" />
            <span className="text-xs mt-1">Anasayfa</span>
          </Link>
        </div>
        <div className="flex w-1/4 justify-center">
          <Link
            href="/dashboard/connections"
            className={`flex flex-col items-center hover:text-blue-300 transition-colors duration-500 ${
              isActive("/dashboard/connections")
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          >
            <MdContacts className="text-2xl" />
            <span className="text-xs mt-1">Bağlantılarım</span>
          </Link>
        </div>
        <div className="relative w-1/4 flex justify-center">
          <Link
            href="/dashboard/children"
            className={`absolute -top-8 hover:bg-blue-400 transition-colors duration-500 ${
              isActive("/dashboard/children") ? "bg-blue-500" : "bg-blue-300"
            } rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-400`}
          >
            <MdOutlineFace className="text-3xl text-white" />
          </Link>
          <div className="flex flex-col items-center">
            <span
              className={`text-xs mt-9 ${
                isActive("/dashboard/children")
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Çocuklarım
            </span>
          </div>
        </div>
        <div className="flex w-1/4 justify-center">
          <Link
            href="/dashboard/shareds"
            className={`flex flex-col items-center hover:text-blue-300 transition-colors duration-500 ${
              isActive("/dashboard/shareds") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <MdMap className="text-2xl" />
            <span className="text-xs text-center mt-1">
              Benimle Paylaşılanlar
            </span>
          </Link>
        </div>
        <div className="flex w-1/4 justify-center">
          <Link
            href="/dashboard/profile"
            className={`flex flex-col items-center hover:text-blue-300 transition-colors duration-500 ${
              isActive("/dashboard/profile") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <MdPerson className="text-2xl" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
