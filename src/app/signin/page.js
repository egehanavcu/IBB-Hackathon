"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdLockOutline,
  MdOutlineVisibilityOff,
  MdPhoneEnabled,
} from "react-icons/md";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("nameSurname", result.nameSurname);
        localStorage.setItem("phoneNumber", phoneNumber);
        router.push("/dashboard");
      } else {
        setErrorMessage(result.message || "Giriş başarısız.");
      }
    } catch (error) {
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.log("Login error:", error);
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
          Giriş Yap
        </motion.h1>

        <form onSubmit={handleLogin}>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <MdPhoneEnabled className="text-gray-400 mr-3" />
              <input
                type="tel"
                placeholder="Telefon Numarası"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
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
              <MdLockOutline className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Şifre"
                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <MdOutlineVisibilityOff className="text-gray-400 cursor-pointer" />
            </div>
          </motion.div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.6,
              delay: 0.9,
              type: "tween",
              ease: "easeOut",
            }}
          >
            Giriş Yap
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
