import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const DOMAIN = "http://172.20.10.2:8080";

export const checkSuccessStatus = async () => {
  try {
    const response = await fetch("/api/jwt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("API isteği sırasında bir hata oluştu:", error);
    return false;
  }
};
