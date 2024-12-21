import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, User } from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Notifications({
  connectionRequests = [
    { name: "Egehan Avcu", relationship: "Çocuk", phone: "+905313131331" },
    { name: "Egehan Avcu", relationship: "Arkadaş", phone: "+905313131331" },
  ],
  notifications = [
    {
      message: "Çocuğunuz Egehan Avcu Çeviriibağ durağından iniş yaptı.",
      timestamp: "12:35",
    },
  ],
  avatarUrl,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header
        userInfo={{
          name: "Egehan Avcu",
          job: "Öğrenci",
          phone: "05078357993",
        }}
        pageName="Bildirimler"
      />
      <Card className="w-full shadow-none border-none">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bağlantı İstekleri
            </h2>
            {connectionRequests.map((request, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {request.name} ({request.relationship})
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {request.phone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 text-green-500"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Diğer Bildirimler
            </h2>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex gap-4 p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
