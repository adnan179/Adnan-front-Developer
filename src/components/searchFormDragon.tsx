"use client";
import React,{useState} from 'react';

interface SearchFormProps{
  handleSearch:(term:string, filter:string,) => void;
};
const SearchFormDragon:React.FC<SearchFormProps>=({handleSearch}) =>{
  const [searchTerm, setSearchTerm] = useState("");
  const [filter,setFilter] = useState('name');

  const onSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    handleSearch(searchTerm,filter);
  }
  return (
    <form onSubmit={onSubmit} className='flex flex-col sm:flex-row items-stretch'>
      <input 
        type='text' value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
        placeholder='wanna search something...'
        className='bg-black/55 text-white rounded-t sm:rounded-l
        py-2 px-6 focus:outline-none focus:ring-1 focus:ring-[#7A3F6E]'
      />
      <select value={filter}
        onChange={(e)=>{setFilter(e.target.value)}}
        className='text-white bg-black/55 ml-0 sm:-ml-[0.7px] 
        rounded-b sm:rounded-r py-2 px-4 focus:outline-none'>
        <option value='name'>Name</option>
        <option value='type'>Type</option>
        <option value='active'>Active</option>
      </select>
      <button type='submit'
        className='ml-0 sm:ml-[-0.7px] bg-white hover:bg-[#7A3F6E] 
        text-black py-2 px-4 hover:text-white
        rounded-b rounded-bl-none sm:rounded-r focus:outline-none'>
        Search
      </button>
    </form>
  )
}
export default SearchFormDragon;
