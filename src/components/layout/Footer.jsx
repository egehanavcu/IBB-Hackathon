import { MdHome } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="flex justify-around p-3">
        <Link href="#" className="flex flex-col items-center text-blue-500">
          <MdHome className="text-3xl" />
          <span className="text-xs">Anasayfa</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-gray-500">
          <MdContacts className="text-3xl" />
          <span className="text-xs">Bağlantılarım</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center text-gray-500 relative"
        >
          <MdNotifications className="text-3xl" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </div>
          <span className="text-xs">Bildirimler</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-gray-500">
          <MdPerson className="text-3xl" />
          <span className="text-xs">Profil</span>
        </Link>
      </div>
    </nav>
  );
}
