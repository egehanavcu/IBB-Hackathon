"use client";

import { useState } from "react";

import IntroScreen from "@/components/IntroScreen";

const LoginScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Giriş Yap</h1>
      <button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg">
        Giriş
      </button>
    </div>
  );
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div>
      {showIntro ? (
        <IntroScreen onFinish={() => setShowIntro(false)} />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}
