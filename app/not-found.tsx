"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      
      {/* Animated Background Glow */}
      <motion.div
        className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"
        animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* 404 Text */}
      <motion.h1
        className="text-9xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      {/* Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-6 h-6 bg-green-500 rounded-full"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-4 h-4 bg-green-400 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </div>
  );
}