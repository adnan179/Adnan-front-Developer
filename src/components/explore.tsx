import React from 'react';
import { categories } from '@/lib/data'; //importing categories data from the data.ts file
import SectionHeading from './sectionHeading';
import Category from './category';

export default function Explore() {
  return (
    <section id="explore" className='flex flex-col items-center justify-center w-full m-0 p-0'>
      <SectionHeading>Spacex categories</SectionHeading>
      <div>
        {
          categories.map((category,index)=>(
            <React.Fragment key={index}>
              <Category {...category}/>
            </React.Fragment>
            
          ))
        }
      </div>
    </section>
  )
}