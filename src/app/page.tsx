import React from 'react';
import Intro from "@/components/intro"
import Divider from '@/components/divider';
import Explore from '@/components/explore';
import About from '@/components/about';

export default function Home() {
  return (
    <main className='w-full overflow-x-hidden h-full p-0 m-0'>
      <Intro/>
      <Divider/>
      <Explore/>
      <Divider/>
      <About/>
      
    </main>
  )
}
