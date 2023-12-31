"use client";
import React, { useEffect, useState } from 'react';
import SearchFormDragon from '@/components/searchFormDragon';

// Define an interface for the Dragon data
interface Dragon {
  id: number;
  active: boolean;
  orbit_duration_yr: number;
  first_flight: string;
  dry_mass_kg:number;
  description: string;
  rocket_id: string;
  name: string;
  type:string;
}
export default function CapsulesGrid() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);
  const [filteredDragons, setFilteredDragons] = useState<Dragon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dragonsPerPage] = useState<number>(4); // Number of capsules per page
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/dragons');
        const data: Dragon[]= await response.json();
        setDragons(data);
        setFilteredDragons(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dragonsPerPage]);

  useEffect(() => {
    // Logic for pagination
    const indexOfLastDragon = currentPage * dragonsPerPage;
    const indexOfFirstDragon = indexOfLastDragon - dragonsPerPage;
    const currentDragons = dragons.slice(indexOfFirstDragon, indexOfLastDragon);
    setFilteredDragons(currentDragons);
  }, [dragons, currentPage, dragonsPerPage]);

  const handleCardClick = (dragon:Dragon) => {
    setSelectedDragon(dragon);
  };

  const handleClosePopup = () => {
    setSelectedDragon(null);
  };

  const handleSearch = (term:string, filter:string) => {
    const filtered = dragons.filter((dragon)=>{
      const searchValue = dragon[filter as keyof Dragon]?.toString().toLowerCase();
      return searchValue?.includes(term.toLowerCase());
    });
    setFilteredDragons(filtered);
    setCurrentPage(1); // Reset to first page on search
  };
  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className='flex flex-col justify-center items-center overflow-x-hidden p-0 m-0 pt-32'>
      {/* Search component */}
      <SearchFormDragon handleSearch={handleSearch}/>

      {/* Dragons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {filteredDragons.map((dragon) => (
          <div
            key={dragon.id}
            className="flex flex-col w-[20rem] bg-gray-300 p-4 rounded-md cursor-pointer"
            onClick={() => handleCardClick(dragon)}
          >
            <h2 className='font-medium text-[2rem]'>{dragon.name}</h2>
            <p>Type: {dragon.type}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-6 pb-10 text-white text-md">
        {Array.from({ length: Math.ceil(dragons.length / dragonsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </button>
        ))}
      </div>

      {/* Popup for selected capsule */}
      {selectedDragon && (
        <div className="z-[2000] fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col w-[25rem] bg-white p-8 rounded-md">
            <h1 className='font-medium'>
              Name: <span className='text-gray-600'>{selectedDragon.name}</span>
            </h1>
            <p>Type: <span className='text-gray-600'>{selectedDragon.type}</span></p>
            <p>active: <span className='text-gray-600'>{selectedDragon.active}</span></p>
            <p>Orbit Duration in years: <span className='text-gray-600'>{selectedDragon.orbit_duration_yr}</span></p>
            <p>Dry mass in kgs: <span className='text-gray-600'>{selectedDragon.dry_mass_kg}</span></p>
            <p>First flight: <span className='text-gray-600'>{selectedDragon.first_flight}</span></p>
            
            <p>Description: <span className='text-gray-600'>{selectedDragon.description}</span></p>
            
            <button onClick={handleClosePopup}
              className='bg-blue-900 px-2 py-1 rounded cursor-pointer'>
                Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
