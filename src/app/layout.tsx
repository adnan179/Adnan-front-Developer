import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spacex',
  description: 'Simple webapp for showcasing spacex info',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-gradient-to-r w-full p-0 m-0 overflow-x-hidden
      from-black to-gray-950 relative`}>
        {/* background-purple color element */}
        <div className='bg-[#7A3F6E] absolute top-[10rem] -right-[16rem] 
          h-[25rem] w-[25rem] -z-10 
          rounded-full blur-[10rem] sm:w-[30rem] md:w-[35rem] lg:w-[40rem]'></div>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
