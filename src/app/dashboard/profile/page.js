import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

export default function ProfileDetails({
  fields = [
    { label: "İsim:", value: "Egehan" },
    { label: "Soyisim:", value: "Avcu" },
    { label: "Telefon:", value: "05313131331" },
    { label: "Kart Seri No:", value: "499DAS09F900923A0" },
  ],
  avatarUrl,
}) {
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
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm text-gray-400">{field.label}</span>
                <Input
                  className="font-medium text-gray-400 placeholder-gray-400"
                  value={field.value}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
