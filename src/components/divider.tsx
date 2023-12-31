"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <motion.div className='bg-white shadow-md shadow-[#7A3F6E] my-20 h-16 w-1 rounded-full hidden sm:block overflow-x-hidden'
    initial={{opacity:0, y:100}}
    animate={{opacity:1,y:0}}
    transition={{delay:0.125}}>
      
    </motion.div>
  )
}
