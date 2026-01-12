import { useState } from 'react';
import {
  APIProvider
} from '@vis.gl/react-google-maps';

import {
  Header,
  Content
} from '../../components'

import './dashboard.css'

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const Footer = () => 
  <div className="text-center w-full h-[50px] fixed bottom-0 pt-[15px] bg-gray-100">
    Book.It Copyright
  </div>


export const Dashboard = () => {

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

    const [range, setRange] = useState<number>(5);

  return (
    <APIProvider apiKey={GOOGLE_MAP_API_KEY} solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
      <div className='h-screen w-screen'>
        <Header setSelectedPlace={setSelectedPlace} setRange={setRange} range={range} />
        <Content selectedPlace={selectedPlace} range={range} />
        <Footer  />
      </div>
    </APIProvider>
  )
}