import React from 'react'

type sectionHeadingProps ={
  children: React.ReactNode;
}
export default function SectionHeading({
  children}: sectionHeadingProps) {
  return (
      <h2 className='text-[1.7rem] font-medium mb-10 text-center 
      text-white/70 overflow-x-hidden'>
        {children}
      </h2>
    
  )
}
