"use client";

import {
  MdPersonOutline,
  MdLockOutline,
  MdOutlineVisibilityOff,
  MdPhoneEnabled,
} from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/utils";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${DOMAIN}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        router.push("/signin");
      } else {
        setError(data.message || "Bir hata oluştu.");
      }
    } catch (err) {
      console.log(err);
      setError("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <motion.div
        className="w-full max-w-sm -mt-40"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-black"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hesap Oluştur
        </motion.h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mb-4">Kayıt başarılı!</p>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPersonOutline className="text-gray-400 mr-3" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Ad"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPersonOutline className="text-gray-400 mr-3" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Soyad"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdLockOutline className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Şifre"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <MdOutlineVisibilityOff className="text-gray-400 cursor-pointer" />
            </div>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPhoneEnabled className="text-gray-400 mr-3" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Telefon Numarası"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex justify-end text-sm text-blue-500 mb-6 mx-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/signin" className="hover:underline">
              Hesabım var
            </Link>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.6,
              delay: 1.2,
              type: "tween",
              ease: "easeOut",
            }}
          >
            Kayıt Ol
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
