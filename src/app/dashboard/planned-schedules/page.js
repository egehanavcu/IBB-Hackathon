"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { MdOutlineDirectionsBus } from "react-icons/md";
import Header from "@/components/layout/Header";

export default function Routes() {
  const routes = [
    {
      id: 1,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
      isActive: true,
      activeDays: ["P", "S", "Ç", "P", "C"],
    },
    {
      id: 2,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
      activeDays: ["P", "C"],
    },
    {
      id: 3,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
      activeDays: ["P", "S", "Ç", "P", "C", "C", "P"],
    },
    {
      id: 4,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
      activeDays: ["Ç"],
    },
  ];

  const daysOfWeek = ["P", "S", "Ç", "P", "C", "C", "P"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        userInfo={{
          name: "Egehan Avcu",
          job: "Öğrenci",
          phone: "05078357993",
        }}
        pageName="Planlı Seferler"
        pageEvent={
          <Button variant="link" className="text-blue-500">
            + Yeni planlama
          </Button>
        }
      />

      <main className="flex-1 p-4 space-y-4">
        <div className="space-y-3">
          {routes
            .filter((route) => !route.isActive)
            .map((route) => (
              <Card
                key={route.id}
                className="p-3 border border-gray-300 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-full">
                    <MdOutlineDirectionsBus className="text-gray-400 text-5xl" />
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="text-base">{route.route}</div>
                        <div className="flex gap-1">
                          {daysOfWeek.map((day, index) => (
                            <span
                              key={index}
                              className={`text-sm ${
                                route.activeDays.includes(day)
                                  ? "text-green-500 font"
                                  : "text-gray-400 font"
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        {route.from} - {route.to}
                      </div>
                      <div className="text-sm text-gray-500">{route.time}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
