import {
  MdPersonOutline,
  MdLockOutline,
  MdOutlineVisibilityOff,
  MdOutlineEmail,
  MdPhoneEnabled,
} from "react-icons/md";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-sm -mt-40">
        <h1 className="text-4xl font-bold mb-8 text-black">Hesap Oluştur</h1>

        <form>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPersonOutline className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdLockOutline className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Şifre"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <MdOutlineVisibilityOff className="text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdOutlineEmail className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="E-posta"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPhoneEnabled className="text-gray-400 mr-3" />
              <input
                type="tel"
                placeholder="Telefon Numarası"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-end text-sm text-blue-500 mb-6 mx-1">
            <Link href="/signin" className="hover:underline">
              Hesabım var
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}
