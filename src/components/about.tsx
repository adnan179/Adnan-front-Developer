"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './sectionHeading';
import spacexImage from '../../public/spacex_img.jpg'; // Replace with your image file path
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className='w-full h-full justify-center items-center'>
      <SectionHeading>About us</SectionHeading>
    <motion.div 
      className="flex flex-row px-4 md:px-6 justify-center items-center"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-[25rem] rounded-lg  md:flex hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={spacexImage} alt="SpaceX" className="w-full rounded-lg" />
      </motion.div>
      <motion.div 
        className="w-[25rem] mt-4 md:mt-0 md:pl-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-white text-justify">
          SpaceX is a leading aerospace manufacturer and space transport services company founded by Elon Musk in 2002. Pioneering innovation in space exploration, SpaceX is committed to revolutionizing space technology with a mission to make life multiplanetary...
        </p>
      </motion.div>
    </motion.div>
    </section>
  );
}
