"use client"
import React from 'react';
import { useState } from "react";
import Form from "@/components/Form.jsx";
import Slider from "@/components/Slider.jsx";
import Artist from "@/components/Artist.jsx";

export const ApiContext = React.createContext({});


export default function Home() {

  const [apiResponse, setApiResponse] = useState([])
  const [minValue, setMinValue] = useState(35);
  const [maxValue, setMaxValue] = useState(46);
  return (
    
    apiResponse.length == 0 ?
    <>
      <img  className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
        <ApiContext.Provider value={{setApiResponse, minValue, maxValue, setMinValue, setMaxValue}}>
          <Form />
          <Slider />
        </ApiContext.Provider>
      </div>
    </>: apiResponse.length == 1 ?
    <>
      <Form />
      <div>Artist name not found. You're too underground</div>
    </>:
    <>
      <img className='m-auto mt-10 scale-125' src="/spotify-100.svg" alt="Logo" />
      <div className='flex flex-col items-center self-center'>
      <ApiContext.Provider value={{setApiResponse, minValue, maxValue, setMinValue, setMaxValue}}>
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