"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { MdOfflineShare } from "react-icons/md";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";

export default function BusRoutes() {
  const routes = [
    {
      id: 1,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
      isActive: true,
    },
    {
      id: 2,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
    },
    {
      id: 3,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
    },
    {
      id: 4,
      route: "41AT",
      from: "Ayazağa",
      to: "Davutpaşa Y.T.Ü",
      time: "21/12/2024 12:15",
    },
  ];

  const users = [
    { id: "1", name: "Egehan Avcu", selected: true },
    { id: "2", name: "Egehan Avcu" },
    { id: "3", name: "Egehan Avcu" },
    { id: "4", name: "Egehan Avcu" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        userInfo={{
          name: "Egehan Avcu",
          job: "Öğrenci",
          phone: "05078357993",
        }}
        pageName="Seferlerim"
      />

      <main className="flex-1 p-4">
        <div className="space-y-3">
          {routes.map((route) => (
            <Card key={route.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MdOutlineDirectionsBus className="text-gray-400 text-5xl" />
                  <div>
                    <div className="text-base font-medium">{route.route}</div>
                    <div className="text-sm text-gray-500">
                      {route.from} - {route.to}
                    </div>
                    <div className="text-sm text-gray-500">{route.time}</div>
                  </div>
                </div>
                {route.isActive && (
                  <Drawer>
                    <DrawerTrigger>
                      <MdOfflineShare className="text-green-500 text-3xl mr-3 mt-1" />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle></DrawerTitle>
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <div className="flex items-center justify-center gap-4">
                              Konumumu
                              <Input className="w-16" />
                              <div className="text-lg font-medium text-black">
                                saat
                              </div>
                              <Input className="w-16" />
                              dakika paylaş.
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {users.map((user) => (
                              <button
                                key={user.id}
                                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <div className="relative">
                                  <div className="w-12 h-12 rounded-full bg-muted" />
                                  {user.selected && (
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                                      <div className="w-3 h-3 text-black" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm text-center truncate w-full">
                                  {user.name.split(" ")[0]}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button>Paylaş</Button>
                        <DrawerClose>İptal Et</DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Button variant="link" className="w-full mt-4 text-sm text-blue-500">
          Diğerlerini görüntüle
        </Button>
        <div className="mb-4" />
      </main>

      <Footer />
    </div>
  );
}
