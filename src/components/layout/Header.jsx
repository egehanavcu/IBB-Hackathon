"use client";

import React from "react";
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import NotificationDrawer from "../util/NotificationDrawer.jsx";
import { usePathname } from "next/navigation";

export default function Header({ pageName, pageEvent }) {
  const userInfo = {
    name: localStorage.getItem("nameSurname"),
    job: "Öğrenci",
    phone: localStorage.getItem("phoneNumber"),
  };
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          pathname == "/dashboard" &&
          "relative w-full min-h-64 shadow-md rounded-b-xl bg-white"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            pathname == "/dashboard" ? "" : "hidden"
          }`}
        >
          <Image
            src="/images/dashheader.svg"
            alt="Otobüs"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-b-xl"
          />
        </div>
        <header className="relative flex items-center justify-between px-6 py-6">
          <div
            className={`flex items-center justify-between w-full ${
              pathname == "/dashboard" &&
              "bg-white rounded-lg px-4 py-3 shadow-md backdrop-blur-md"
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-xl font-semibold text-gray-600">
                  {userInfo.name[0]}
                </span>
              </div>
              <div className="ml-3">
                <div
                  className={`text-lg font-bold ${
                    pathname == "/dashboard" ? "text-gray-800" : "text-slate-50"
                  }`}
                >
                  {userInfo.name}
                </div>
                <div
                  className={`text-sm font-medium ${
                    pathname == "/dashboard"
                      ? "text-gray-500"
                      : "text-slate-300"
                  }`}
                >
                  {userInfo.phone}
                </div>
              </div>
            </div>

            <NotificationDrawer
              connectionRequests={[
                {
                  name: "Ahmet Doe",
                  relationship: "Çocuk",
                  phone: "+905412569585",
                },
                {
                  name: "Egehan Avcu",
                  relationship: "Arkadaş",
                  phone: "+905318569446",
                },
              ]}
              notifications={[
                {
                  message:
                    "Çocuğunuz Ahmet Doe 41AT Hattından Cevizlibağ durağında iniş yaptığını bildirdi.",
                  timestamp: "12:35",
                },
              ]}
              trigger={
                <div className="relative">
                  <MdNotifications
                    className={`text-3xl ${
                      pathname == "/dashboard"
                        ? "text-gray-800"
                        : "text-slate-50"
                    }`}
                  />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </div>
              }
            />
          </div>
        </header>
      </div>
      <div
        className={`flex justify-between items-center px-6 pt-3 bg-slate-50 text-gray-900 rounded-t-2xl ${
          pathname == "/dashboard" && "z-10 -mt-8"
        }`}
      >
        <h1 className="font-semibold text-2xl pt-3">{pageName}</h1>
        {pageEvent}
      </div>
    </>
  );
}
