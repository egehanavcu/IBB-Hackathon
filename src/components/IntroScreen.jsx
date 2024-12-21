import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const IntroScreen = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 1: forward, -1: backward

  const slides = [
    {
      title: "Hoş Geldin!",
      description:
        "Toplu taşımada konumunu güvenle paylaşmanın yeni yolu burada.",
      image: "/images/otobus.svg",
    },
    {
      title: "Ebeveynlerini Bilgilendir!",
      description:
        "Otobüse bindiğinde, hedefe vardığında veya indiğinde ebeveynlerin anında haberdar olsun.",
      image: "/images/ebeveyn.svg",
    },
    {
      title: "Arkadaşlarınla İletişimde Kal!",
      description:
        "Toplu taşımadayken arkadaşlarınla konum paylaşarak buluşmaya ne kadar yaklaştığını göster.",
      image: "/images/arkadas.svg",
    },
    {
      title: "Diğerlerini Takip Et!",
      description:
        "Arkadaşlarının ve çocuklarının hareketlerini güvenle takip et, herkesin güvende olduğundan emin ol.",
      image: "/images/harita.svg",
    },
    {
      title: "Sen de Aramıza Katıl!",
      description:
        "Hemen giriş yap veya kaydol, toplu taşımada güvenli ve bağlantılı bir deneyim yaşa!",
      image: "/images/giris.svg",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      scale: 1,
    }),
    center: {
      x: 0,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      scale: 1,
    }),
  };

  return (
    <div
      {...handlers}
      className="h-screen flex flex-col bg-white px-6 relative"
    >
      <motion.div
        key={currentSlide}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col justify-center items-center text-center flex-grow"
      >
        <Image
          width={300}
          height={300}
          src={slides[currentSlide].image}
          alt="Illustration"
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold mt-6">
          {slides[currentSlide].title}
        </h1>
        <p className="text-gray-600 mt-2 px-4">
          {slides[currentSlide].description}
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-4 w-full mb-6">
        {currentSlide === slides.length - 1 ? (
          <>
            <Link
              href="/signup"
              className="bg-blue-500 text-white px-20 py-2 rounded-full shadow-lg"
            >
              Hesap oluştur
            </Link>
            <Link href="/signin" className="text-blue-400 cursor-pointer">
              Hesabım var
            </Link>
          </>
        ) : (
          <button
            onClick={nextSlide}
            className="bg-blue-500 text-white px-8 py-2 rounded-full shadow-lg"
          >
            İlerle
          </button>
        )}

        <div className="flex justify-center items-center space-x-2 mt-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
