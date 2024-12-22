"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { checkSuccessStatus, DOMAIN } from "@/lib/utils";

export default function ProfileDetails({ avatarUrl }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtData = await checkSuccessStatus();
        const response = await fetch(
          `${DOMAIN}/api/users/getAuthenticatedUser`,
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
          setUserData(data.data);
        } else {
          console.log("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1">
        <div className="flex flex-col items-center mt-20">
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <User className="w-24 h-24 text-gray-400" />
            )}
          </div>
        </div>
        <div className="px-6 mt-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">İsim:</span>
              <Input
                className="font-medium text-gray-400 placeholder-gray-400"
                value={userData ? userData.firstName : "Yükleniyor..."}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Soyisim:</span>
              <Input
                className="font-medium text-gray-400 placeholder-gray-400"
                value={userData ? userData.lastName : "Yükleniyor..."}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Telefon:</span>
              <Input
                className="font-medium text-gray-400 placeholder-gray-400"
                value={userData ? userData.phoneNumber : "Yükleniyor..."}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Kart Seri No:</span>
              <Input
                className="font-medium text-gray-400 placeholder-gray-400"
                value={
                  userData ? userData.istanbulCardId || "N/A" : "Yükleniyor..."
                }
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
