"use client";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { MdPerson } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { checkSuccessStatus, DOMAIN } from "@/lib/utils";
const LocationViewer = dynamic(
  () => import("../../../components/util/LocationViewer"),
  {
    ssr: false,
  }
);

export default function Routes() {
  const [sharedRoutes, setSharedRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchSharedRoutes = async () => {
      try {
        const jwtData = await checkSuccessStatus();
        const response = await fetch(
          `${DOMAIN}/api/shareds/getAllPublishedSharedsOfAuthenticatedUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtData.token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          const uniquePublishers = {};

          const filteredRoutes = data.data.filter((route, index) => {
            if (!uniquePublishers[route.publisher.id]) {
              uniquePublishers[route.publisher.id] = true;
              return true;
            }
            return false;
          });

          const formattedRoutes = filteredRoutes.map((route) => {
            const shareStartDate = new Date(route.shareStartTime);
            const formattedDateTime = shareStartDate.toLocaleString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            return {
              id: route.id,
              friend: `${route.publisher.firstName} ${route.publisher.lastName}`,
              friendNumber: route.publisher.phoneNumber,
              isChild: route.shareType === "PARENT",
              shareStartDate: formattedDateTime,
            };
          });

          setSharedRoutes(formattedRoutes);
        }
      } catch (error) {
        console.log("Error fetching shared routes:", error);
      }
    };

    fetchSharedRoutes();
  }, []);

  const handleCardClick = (route) => {
    setSelectedRoute(route);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header pageName="Benimle Paylaşılanlar" />
      <main className="flex-1 p-4 space-y-4 bg-slate-50">
        <div className="space-y-3">
          {sharedRoutes.map((sharedRoute) => (
            <Card
              key={sharedRoute.id}
              onClick={() => handleCardClick(sharedRoute)}
              className="p-4 flex items-center justify-between bg-white border-none rounded-lg hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                  <MdPerson className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-lg text-gray-900">
                    {sharedRoute.friend}
                  </div>
                  <div className="text-xs text-gray-600">
                    {sharedRoute.friendNumber}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-800 font-bold">
                    Paylaşılma Tarihi:{" "}
                    <span className="font-medium">
                      {sharedRoute.shareStartDate}
                    </span>
                  </div>
                </div>
                <MdArrowForwardIos
                  className={`${
                    sharedRoute.isChild ? "text-blue-500" : "text-blue-300"
                  } w-5 h-5`}
                />
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <LocationViewer
        route={selectedRoute}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
