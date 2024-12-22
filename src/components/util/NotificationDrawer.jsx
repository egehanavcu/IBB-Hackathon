"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdPerson } from "react-icons/md";

export default function NotificationDrawer({
  trigger,
  connectionRequests = [],
  notifications = [],
  avatarUrl,
}) {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bildirimler</DrawerTitle>
          <DrawerDescription>
            Gelen bağlantı isteklerini ve bildirimlerinizi buradan
            görüntüleyebilirsiniz.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold">Bağlantı İstekleri</h3>
            <div className="space-y-4">
              {connectionRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <MdPerson className="w-6 h-6 text-gray-400" />
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
                      ✓
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 text-red-500"
                    >
                      ✗
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Diğer Bildirimler</h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Notification"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <MdPerson className="w-6 h-6 text-gray-400" />
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
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline w-full">Kapat</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
