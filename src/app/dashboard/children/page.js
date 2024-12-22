"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MdPerson } from "react-icons/md";

import Header from "@/components/layout/Header";
import { checkSuccessStatus, DOMAIN } from "@/lib/utils";
import Link from "next/link";

function ContactGroup({ title, contacts }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <Link key={index} href={`/dashboard/children/${contact.id}`} passHref>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 shadow-none hover:bg-gray-100 cursor-pointer">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                <MdPerson className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{contact.name}</div>
                <div className="text-sm text-gray-600">{contact.phone}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isParent, setIsParent] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
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

        if (!response.ok) {
          throw new Error("Bağlantılar yüklenirken bir hata oluştu.");
        }

        const data = await response.json();
        const friends = data.data
          .filter((item) => item.shareType === "PARENT")
          .reduce((acc, item) => {
            const isDuplicate = acc.some(
              (contact) => contact.id === item.publisher.id
            );
            if (!isDuplicate) {
              acc.push({
                id: item.publisher.id,
                name: `${item.publisher.firstName} ${item.publisher.lastName}`,
                phone: item.publisher.phoneNumber,
              });
            }
            return acc;
          }, []);

        setContacts(friends);
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    const shareEndTime = new Date(
      Date.now() + 10 * 60 * 60 * 1000
    ).toISOString();
    const shareType = isParent ? "PARENT" : "FRIEND";

    const payload = {
      phoneNumbers: [phoneNumber],
      shareEndTime,
      shareType,
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

      if (!response.ok) {
        throw new Error("Bağlantı eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Error adding contact:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header pageName="Bağlantılarım" />

      <main className="flex-1 px-4 py-6 bg-slate-50">
        <Card className="w-full mx-auto bg-slate-50 shadow-none border-none">
          <CardContent className="p-6 space-y-8 bg-transparent shadow-none border-none">
            <div className="space-y-4">
              <ContactGroup title="Çocuklarım" contacts={contacts} />
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
