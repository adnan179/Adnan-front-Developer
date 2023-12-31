"use client";
import React, { useEffect, useState } from 'react';
import SearchFormRocket from '@/components/searchFormRocket';


// Define an interface for the rocket data
interface Rocket {
  id: number;
  active: boolean;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: { meters: number; feet: number };
  diameter: { meters: number; feet: number };
  mass: { kg: number; lb: number };
  description: string;
  rocket_id: string;
  rocket_name: string;
}


export default function RocketsGrid() {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [selectedRocket, setSelectedRocket] = useState<Rocket | null>(null);
  const [filteredRockets, setFilteredRockets] = useState<Rocket[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rocketsPerPage] = useState<number>(4); // Number of capsules per page
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/rockets');
        const data: Rocket[]= await response.json();
        setRockets(data);
        setFilteredRockets(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [rocketsPerPage]);

  useEffect(() => {
    // Logic for pagination
    const indexOfLastRocket = currentPage * rocketsPerPage;
    const indexOfFirstRocket = indexOfLastRocket - rocketsPerPage;
    const currentRockets = rockets.slice(indexOfFirstRocket, indexOfLastRocket);
    setFilteredRockets(currentRockets);
  }, [rockets, currentPage, rocketsPerPage]);

  const handleCardClick = (rocket:Rocket) => {
    setSelectedRocket(rocket);
  };

  const handleClosePopup = () => {
    setSelectedRocket(null);
  };

  const handleSearch = (term:string, filter:string) => {
    const filtered = rockets.filter((rocket)=>{
      const searchValue = rocket[filter as keyof Rocket]?.toString().toLowerCase();
      return searchValue?.includes(term.toLowerCase());
    });
    setFilteredRockets(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className='flex flex-col justify-center items-center overflow-x-hidden p-0 m-0 pt-32'>
      {/* Search component */}
      <SearchFormRocket handleSearch={handleSearch}/>

      {/* Rockets grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {filteredRockets.map((rocket) => (
          <div
            key={rocket.id}
            className="flex flex-col w-[20rem] bg-gray-300 p-4 rounded-md cursor-pointer"
            onClick={() => handleCardClick(rocket)}
          >
            <h2 className='font-medium text-[2rem]'>{}</h2>
            <p>Name: {rocket.rocket_name}</p>
            <p>Id:{rocket.rocket_id}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-6 pb-10 text-white text-md">
        {Array.from({ length: Math.ceil(rockets.length / rocketsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </button>
        ))}
      </div>

      {/* Popup for selected capsule */}
      {selectedRocket && (
        <div className="z-[2000] fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col w-[30rem] bg-white p-8 rounded-md">
            <h1 className='font-medium'>
              Name: <span className='text-gray-600'>{selectedRocket.rocket_name}</span>
            </h1>
            <p>First flight: <span className='text-gray-600'>{selectedRocket.first_flight}</span></p>
            <p>Active: <span className='text-gray-600'>{selectedRocket.active}</span></p>
            <p>Success Rate pct: <span className='text-gray-600'>{selectedRocket.success_rate_pct}</span></p>
            <p>Cost per launch: <span className='text-gray-600'>{selectedRocket.cost_per_launch}</span></p>
            <p>Company: <span className='text-gray-600'>{selectedRocket.company}</span></p>
            <p>Boosters: <span className='text-gray-600'>{selectedRocket.boosters}</span></p>
            <p>Description: <span className='text-gray-600'>{selectedRocket.description}</span></p>
            <p>Country: <span className='text-gray-600'>{selectedRocket.country}</span></p>
            <p>Mass: <span className='text-gray-600'>{selectedRocket.mass.kg}kgs</span></p> 
            <p>Height: <span className='text-gray-600'>{selectedRocket.height.feet}feet</span></p>
            <p>Diameter: <span className='text-gray-600'>{selectedRocket.diameter.feet}feet</span></p>
            <p>Height: <span className='text-gray-600'>{selectedRocket.height.feet}feet</span></p>
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
