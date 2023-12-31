"use client";
import React from 'react';
import Link from 'next/link';
import {motion} from "framer-motion";

export default function Intro() {
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center h-full w-full
      text-white mt-[-50px] sm:mt-0 gap-5 overflow-x-hidden"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.7,
          delay: 0.2,
        }}
        className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        Welcome to
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.7,
          delay: 0.2,
        }}
        className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        SpaceX
      </motion.div>
      
    </section>
  );
}

