"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { MdOutlineDirectionsBus } from "react-icons/md";
import Header from "@/components/layout/Header";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useState, useEffect, use } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkSuccessStatus, DOMAIN } from "@/lib/utils";

export default function Routes({ params }) {
  const { userId } = use(params);
  const [boarding, setBoarding] = useState("");
  const [boardingStop, setBoardingStop] = useState("");
  const [alightingStop, setAlightingStop] = useState("");
  const [routes, setRoutes] = useState([]);
  const [lineCodes, setLineCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableStops, setAvailableStops] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    async function fetchLines() {
      const response = await fetch(`${DOMAIN}/api/lines/getAllLines`);
      const data = await response.json();
      if (data.success) {
        setLineCodes(data.data);
      }
    }
    fetchLines();
  }, []);

  useEffect(() => {
    if (boarding) {
      async function fetchStops() {
        const response = await fetch(
          `${DOMAIN}/api/lines/getStopsByLineCode?lineCode=${boarding}`
        );
        const data = await response.json();
        if (data.success) {
          setAvailableStops(data.data);
        }
      }
      fetchStops();
    }
  }, [boarding]);

  useEffect(() => {
    async function fetchSchedules() {
      const jwtData = await checkSuccessStatus();
      const response = await fetch(
        `${DOMAIN}/api/schedules/getSchedulesOfAuthenticatedParent`,
        {
          headers: {
            Authorization: `Bearer ${jwtData.token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        const formattedRoutes = data.data.map((schedule) => ({
          id: schedule.id,
          enterStopName: schedule.enterStop.stopName,
          enterStopCode: schedule.enterStop.stopCode,
          leaveStopName: schedule.leaveStop.stopName,
          leaveStopCode: schedule.leaveStop.stopCode,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          lineCode: schedule.line.lineCode,
        }));
        setRoutes(formattedRoutes);
      }
    }
    fetchSchedules();
  }, []);

  const filteredLineCodes = lineCodes.filter((line) =>
    line.lineCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!userId) {
      return;
    }

    const days = selectedDay ? [selectedDay] : [];
    const payload = {
      childId: userId,
      days,
      startTime: startTime + ":00",
      endTime: endTime + ":00",
      enterStopId: boardingStop,
      leaveStopId: alightingStop,
      lineCode: boarding,
    };

    const jwtData = await checkSuccessStatus();
    const response = await fetch(`${DOMAIN}/api/schedules/addSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtData.token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header
        pageName="Planlı Seferler"
        pageEvent={
          <Drawer>
            <DrawerTrigger>
              <Button variant="link" className="text-blue-500 pt-6">
                + Yeni planlama
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Yeni Plan Ekle</DrawerTitle>
                <div className="space-y-2">
                  <Label htmlFor="lineCode">Geçerli Hat</Label>
                  <Select value={boarding} onValueChange={setBoarding}>
                    <SelectTrigger className="mb-2">
                      <SelectValue placeholder="Hat seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Geçerli Hat Seçiniz</SelectLabel>

                        <div className="p-2">
                          <input
                            type="text"
                            placeholder="Hat ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        {filteredLineCodes.map((line) => (
                          <SelectItem key={line.id} value={line.lineCode}>
                            {line.lineCode}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Biniş</Label>
                  <Select value={boardingStop} onValueChange={setBoardingStop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durak seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStops.map((stop) => (
                        <SelectItem key={stop.id} value={stop.id}>
                          {stop.stopName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>İniş</Label>
                  <Select
                    value={alightingStop}
                    onValueChange={setAlightingStop}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Durak seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStops.map((stop) => (
                        <SelectItem key={stop.id} value={stop.id}>
                          {stop.stopName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selectedDay">Gün Seçin</Label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gün seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MONDAY">Pazartesi</SelectItem>
                      <SelectItem value="TUESDAY">Salı</SelectItem>
                      <SelectItem value="WEDNESDAY">Çarşamba</SelectItem>
                      <SelectItem value="THURSDAY">Perşembe</SelectItem>
                      <SelectItem value="FRIDAY">Cuma</SelectItem>
                      <SelectItem value="SATURDAY">Cumartesi</SelectItem>
                      <SelectItem value="SUNDAY">Pazar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Başlangıç Saati</Label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Bitiş Saati</Label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={handleSubmit}>Onayla</Button>
                <DrawerClose>
                  <Button variant="outline" className="w-full">
                    İptal Et
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
      />

      <main className="flex-1 p-4 space-y-4 bg-slate-50">
        <div className="space-y-3">
          {routes.map((route) => (
            <Card
              key={route.id}
              className="p-3 border border-none bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-full">
                  <MdOutlineDirectionsBus className="text-gray-400 text-5xl" />
                  <div className="w-full">
                    <div className="text-base font-semibold">
                      {route.enterStopName} - {route.leaveStopName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Hat: {route.lineCode} | Saat: {route.startTime} -{" "}
                      {route.endTime}
                    </div>
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
