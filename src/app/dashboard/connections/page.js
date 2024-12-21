import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, User } from "lucide-react";
import Image from "next/image";

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
import Header from "@/components/layout/Header";

function ContactGroup({ title, contacts }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-2">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
          >
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-muted-foreground">
                {contact.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactsList() {
  const contacts = [{ name: "Egehan Avcu", phone: "+905313131331" }];

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        userInfo={{
          name: "Egehan Avcu",
          job: "Öğrenci",
          phone: "05078357993",
        }}
        pageName="Bağlantılarım"
        pageEvent={
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
                  Bağlantı eklemek için kişinin telefon numarasını gir.
                  <div className="mb-4" />
                  <Input placeholder="Telefon numarası giriniz." />
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
        }
      />

      <main className="flex-1 px-2">
        <Card className="w-full mx-auto shadow-none border-none">
          <CardContent className="p-6 space-y-6">
            <ContactGroup
              title="Ebeveynlerim"
              contacts={contacts.slice(0, 2)}
            />
            <ContactGroup title="Çocuklarım" contacts={contacts.slice(0, 1)} />
            <ContactGroup
              title="Arkadaşlarım"
              contacts={contacts.slice(0, 3)}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
