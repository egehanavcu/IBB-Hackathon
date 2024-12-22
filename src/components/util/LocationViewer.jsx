"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdPerson } from "react-icons/md";
import { useEffect, useState } from "react";
import { DOMAIN } from "@/lib/utils";

export default function LocationViewer({ route, isOpen, onClose }) {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (route) {
      fetch(`${DOMAIN}/api/lines/getStopsByLineCode?lineCode=150`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data.data);
            setStops(data.data);
          } else {
            console.log("Durak bilgileri alınamadı:", data.message);
          }
        })
        .catch((error) => {
          console.log("API hatası:", error);
        });
    }
  }, [route]);

  useEffect(() => {
    const drawer = document.querySelector(".drawer-content");
    if (drawer) {
      drawer.style.overflow = "hidden";
    }
    return () => {
      if (drawer) {
        drawer.style.overflow = "";
      }
    };
  }, []);

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [12, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const busIcon = new L.Icon({
    iconUrl: "/images/bus.png",
    iconSize: [20, 20],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    zIndexOffset: 1000,
  });

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="p-0 drawer-content">
        <div className="p-4 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
            <MdPerson className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="font-medium text-lg text-gray-900">
              {route?.friend}
            </div>
            <div className="text-xs text-gray-500">{route?.friendNumber}</div>
          </div>
        </div>

        {stops[2] && (
          <MapContainer
            center={[stops[2].locationY, stops[2].locationX]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "400px" }}
            dragging={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {stops[2] && (
              <Marker
                position={[stops[2].locationY, stops[2].locationX]}
                icon={busIcon}
              ></Marker>
            )}

            {stops.map((stop) => (
              <Marker
                key={stop.id}
                position={[stop.locationY, stop.locationX]}
                icon={defaultIcon}
              >
                <Popup>
                  <div>
                    <strong>{stop.stopName}</strong>
                    <br />
                    Durak Kodu: {stop.stopCode}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <DrawerFooter className="p-4 bg-white border-t">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Kapat
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
