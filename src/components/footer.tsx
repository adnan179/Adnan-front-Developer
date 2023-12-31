"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import logo from '../../public/spacex_logo.png';
import { social_links } from '@/lib/data';
import Link from 'next/link';

export default function Footer() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        x: '100%',
        transition: {
          duration: 1,
          ease: 'easeInOut',
        },
      });

      await controls.start({
        x: 0,
        transition: {
          duration: 1,
          ease: 'easeInOut',
        },
      });
    };

    sequence();
  }, [controls]);

  return (
    <footer className='z-[997] lg:relative'>
      <motion.div
        className='flex flex-col lg:flex-row lg:fixed bottom-0 justify-center lg:justify-between 
        items-center w-full px-2 py-6 lg:h-[100px]'
        initial={{ x: '-100%' }}
        animate={controls}
      >
        <div className='flex w-[20rem]'>
          <Link href='https://www.spacex.com/'>
            <Image src={logo} alt='just logo...' />
          </Link>
        </div>
        <div className='flex flex-col mt-[-20px] mb-5 sm:mb-0 sm:mt-0 sm:flex-row gap-5 text-gray-500 sm:pr-10'>
          {social_links.map((link, index) => (
            <Link className='hover:text-white cursor-pointer' key={index} href={link.hash}>
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
      
    </footer>
  );
}


