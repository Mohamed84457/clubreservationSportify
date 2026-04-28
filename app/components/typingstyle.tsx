"use client";
import { useEffect, useState } from "react";

export default function Typing({ inputText = "" }: { inputText: string }) {
  const text = inputText;
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout); // cleanup
    }
  }, [currentIndex, text]);

  return (
    <h1 className="text-xl font-bold p-5">
      {currentText}
      <span className=" ml-1 animate-pulse">|</span>
    </h1>
  );
}
