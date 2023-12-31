"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { links } from '@/lib/data';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='z-[999] relative'>
      {/* container with framer motion */}
      <motion.div className='fixed top-6 left-1/2 h-[5rem] w-[20rem]
      border-opacity-40 backdrop-blur-[0.5rem] bg-gray-600 bg-opacity-50
      shadow-lg shadow-[#7A3F6E] sm:h-[3.25rem] sm:w-[25rem] rounded-full' 
      initial={{ y: -100, x: "-50%", opacity: 0 }} 
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      {/* nav links with animation */}
      <nav className='flex fixed top-[2.2rem] left-1/2 h-12 -translate-x-1/2 
      sm:top-[1.7rem] sm:h-[inital]'>
        <ul className='flex flex-wrap items-center justify-center gap-y-1 
        text-[0.9rem] font-medium text-gray-400 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map((link) => (
            <motion.li className='h-3/4 flex items-center justify-center' key={link.hash}
              initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            >
              <Link
                href={link.hash}
                className='flex items-center justify-center px-3 py-3 hover:text-white cursor-pointer transition'
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
