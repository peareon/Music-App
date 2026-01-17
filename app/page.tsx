"use client"
import React from 'react';
import { useState } from "react";
import Form from "@/components/Form.jsx";
import Slider from "@/components/Slider.jsx";
import Artist from "@/components/Artist.jsx";
import Image from 'next/image';

export const ApiContext = React.createContext({});


export default function Home() {

  const [query, setQuery] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [minValue, setMinValue] = useState(35);
  const [maxValue, setMaxValue] = useState(46);
  return (
    
    !query ?
    <>
      <Image width={100} height={100} className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
        <ApiContext.Provider value={{setApiResponse, setQuery, minValue, maxValue, setMinValue, setMaxValue}}>
          <Form />
          <Slider />
        </ApiContext.Provider>
      </div>
    </>: apiResponse[0] == "No artist found" ?
    <>
      <Image width={100} height={100} className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
        <ApiContext.Provider value={{setApiResponse, setQuery, minValue, maxValue, setMinValue, setMaxValue}}>
          <Form />
          <Slider />
        </ApiContext.Provider>
      </div>
      <div className='flex items-center justify-center text-2xl'>Artist name not found. You are too underground</div>
    </>: apiResponse[0] === "No tracks found" ?
    <>
      <Image width={100} height={100} className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
        <ApiContext.Provider value={{setApiResponse, setQuery, minValue, maxValue, setMinValue, setMaxValue}}>
          <Form />
          <Slider />
        </ApiContext.Provider>
      </div>
      <div className='flex items-center justify-center text-2xl'>No tracks found. Make the popularity range broader</div>
    </>:
    <>
      <Image width={100} height={100} className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
      <ApiContext.Provider value={{setApiResponse, setQuery, minValue, maxValue, setMinValue, setMaxValue}}>
        <Form />
        <Slider />
        <div className='flex max-w-[96%] flex-grow-1 gap-[60px] justify-center'>
          {apiResponse.map(artist => {
            return(
              <Artist 
              key={artist.id}
              preview_url={artist.preview_url}
              imagen={artist.album.images[0].url}
              name={artist.name}
              artist_name={artist.artists[0].name}
              />
            )
          })}
        </div>
      </ApiContext.Provider>
    </div>
    </>
  )
}