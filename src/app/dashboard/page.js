"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { MdCheck } from "react-icons/md";
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
import { checkSuccessStatus, DOMAIN } from "@/lib/utils";

export default function BusRoutes() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [turnstiles, setTurnstiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    const fetchTurnstiles = async () => {
      try {
        const jwtData = await checkSuccessStatus();
        const response = await fetch(
          `${DOMAIN}/api/turnstiles/getTurnstilesOfAuthenticatedUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtData.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          setTurnstiles(data.data);
        } else {
          console.log("Failed to fetch turnstiles data:", data.message);
        }
      } catch (error) {
        console.log("Error fetching turnstiles:", error);
      }
    };

    fetchTurnstiles();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwtData = await checkSuccessStatus();
        const response = await fetch(
          `${DOMAIN}/api/shareds/getAllPublishedAndPublisherSharedsOfAuthenticatedUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtData.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          const uniqueFriendUsers = data.data.filter(
            (user, index, self) =>
              index ===
              self.findIndex((u) => u.published.id === user.published.id)
          );

          setUsers(uniqueFriendUsers);
        } else {
          console.log("Failed to fetch shared data:", data.message);
        }
      } catch (error) {
        console.log("Error fetching shared data:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId, phoneNumber) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        setSelectedPhoneNumbers((prevNumbers) =>
          prevNumbers.filter((number) => number !== phoneNumber)
        );
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        setSelectedPhoneNumbers((prevNumbers) => [...prevNumbers, phoneNumber]);
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleSubmit = async () => {
    const currentTime = new Date();
    const endTime = new Date(currentTime);
    endTime.setHours(endTime.getHours() + parseInt(hours, 10));
    endTime.setMinutes(endTime.getMinutes() + parseInt(minutes, 10));

    const shareEndTime = endTime.toISOString();

    const uniquePhoneNumbers = [...new Set(selectedPhoneNumbers)];

    const payload = {
      phoneNumbers: uniquePhoneNumbers,
      shareEndTime: shareEndTime,
      shareType: "FRIEND",
    };

    try {
      const jwtData = await checkSuccessStatus();

      const response = await fetch(`${DOMAIN}/api/shareds/addShared`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Successfully shared.");
      } else {
        console.log("Failed to share:", data.message);
      }
    } catch (error) {
      console.log("Error sharing data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header
        pageName="Seferlerim"
        pageEvent={
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="link" className="text-blue-500 pt-6">
                + Yeni konum paylaşımı
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center gap-4">
                      Konumumu
                      <Input
                        className="w-16"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                      <div className="text-lg font-medium text-black">saat</div>
                      <Input
                        className="w-16"
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                      />
                      <div className="text-lg font-medium text-black">
                        dakika paylaş.
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={() =>
                          toggleUserSelection(
                            user.id,
                            user.published.phoneNumber
                          )
                        }
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-400" />
                          {selectedUsers.includes(user.id) && (
                            <MdCheck
                              className="absolute top-0 right-0 text-white text-lg"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                borderRadius: "50%",
                                padding: "2px",
                              }}
                            />
                          )}
                        </div>
                        <span className="text-sm text-center truncate w-full">
                          {user.published.firstName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={handleSubmit}>Paylaş</Button>
                <DrawerClose>İptal Et</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
      />

      <main className="flex-1 p-4 bg-slate-50">
        <div className="space-y-3">
          {turnstiles.map((turnstile) => (
            <Card
              key={turnstile.id}
              className={`p-3 border ${
                turnstile.hasExited ? "border-gray-300" : "border-green-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MdOutlineDirectionsBus
                    className={`text-5xl ${
                      turnstile.hasExited ? "text-gray-400" : "text-green-500"
                    }`}
                  />
                  <div>
                    <div className="text-base font-medium">
                      {turnstile.line.lineName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {turnstile.line.lineCode}
                    </div>
                    <div className="text-sm text-gray-500">
                      {!turnstile.hasExited ? (
                        <>
                          <span className="text-green-500 font-semibold">
                            Aktif
                          </span>{" "}
                          - {new Date(turnstile.passTime).toLocaleString()}
                        </>
                      ) : (
                        <span className="text-gray-400">Çıkış yapıldı</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mb-4" />
      </main>

      <Footer />
    </div>
  );
}
