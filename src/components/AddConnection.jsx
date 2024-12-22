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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function AddConnection() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="link" className="text-blue-500">
          + Yeni bağlantı
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bağlantı Ekle</DrawerTitle>
          <DrawerDescription>
            Bağlantı ekleme isteği göndermek için kişinin telefon numarasını
            giriniz.
            <div className="mb-4" />
            <Input placeholder="Telefon numarası giriniz." />
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox id="is-parent" />
              <label
                htmlFor="is-parent"
                className="text-base font-medium leading-none"
              >
                Ebeveyniniz mi?
              </label>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Ekle</Button>
          <DrawerClose>
            <Button variant="outline w-full">İptal Et</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
