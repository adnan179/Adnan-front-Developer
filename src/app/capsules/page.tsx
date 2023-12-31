"use client";
import React, { useEffect, useState } from 'react';
import SearchFormCapsule from '@/components/searchFormCapsule';

// Define an interface for the capsule data
interface Capsule {
  capsule_serial: string;
  capsule_id: string;
  status: string;
  original_launch: string;
  original_launch_unix: number;
  missions: { name: string; flight: number }[];
  landings: number;
  type: string;
  details: string | null;
  reuse_count: number;
};

export default function CapsulesGrid() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [filteredCapsules, setFilteredCapsules] = useState<Capsule[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [capsulesPerPage] = useState<number>(6); // Number of capsules per page

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        const data: Capsule[]= await response.json();
        setCapsules(data);
        setFilteredCapsules(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [capsulesPerPage]);

  useEffect(() => {
    // Logic for pagination
    const indexOfLastCapsule = currentPage * capsulesPerPage;
    const indexOfFirstCapsule = indexOfLastCapsule - capsulesPerPage;
    const currentCapsules = capsules.slice(indexOfFirstCapsule, indexOfLastCapsule);
    setFilteredCapsules(currentCapsules);
  }, [capsules, currentPage, capsulesPerPage]);

  const handleCardClick = (capsule:Capsule) => {
    setSelectedCapsule(capsule);
  };

  const handleClosePopup = () => {
    setSelectedCapsule(null);
  };

  const handleSearch = (term:string, filter:string) => {
    const filtered = capsules.filter((capsule)=>{
      const searchValue = capsule[filter as keyof Capsule]?.toString().toLowerCase();
      return searchValue?.includes(term.toLowerCase());
    });
    setFilteredCapsules(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className='flex flex-col justify-center items-center pt-32'>
      {/* Search component */}
      <SearchFormCapsule handleSearch={handleSearch}/>

      {/* Capsules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {filteredCapsules.map((capsule) => (
          <div
            key={capsule.capsule_serial}
            className="flex flex-col w-[20rem] bg-gray-300 p-4 rounded-md cursor-pointer"
            onClick={() => handleCardClick(capsule)}
          >
            <h2 className='font-medium text-[2rem]'>{capsule.capsule_serial}</h2>
            <p>Capsule ID: {capsule.capsule_id}</p>
            <p>{capsule.details}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="z-[3000] flex justify-center pt-6 pb-20 text-white text-md cursor-pointer">
        {Array.from({ length: Math.ceil(capsules.length / capsulesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </button>
        ))}
      </div>

      {/* Popup for selected capsule */}
      {selectedCapsule && (
        <div className="z-[2000] fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col bg-white p-8 rounded-md">
            <h1 className='font-medium'>
              Capsule Serial: <span className='text-gray-600'>{selectedCapsule.capsule_serial}</span>
            </h1>
            <p>Status: <span className='text-gray-600'>{selectedCapsule.status}</span></p>
            <p>Capsule ID: <span className='text-gray-600'>{selectedCapsule.capsule_id}</span></p>
            <p>Type: <span className='text-gray-600'>{selectedCapsule.type}</span></p>
            <p>Details: <span className='text-gray-600'>{selectedCapsule.details}</span></p>
            <p>Original Launch: <span className='text-gray-600'>{selectedCapsule.original_launch}</span></p>
            <p>Missions:</p> 
            {selectedCapsule.missions.map((mission,index)=>(
              <div key={index} className='pl-3'>
                <p>Name:<span className='text-gray-600'>{mission.name}</span></p>
                <p>Flight:<span className='text-gray-600'>{mission.flight}</span></p>
              </div>
            ))}
            <p>Landings: <span className='text-gray-600'>{selectedCapsule.landings}</span></p>
            <p>Reuse Count: <span className='text-gray-600'>{selectedCapsule.reuse_count}</span></p>
            
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
