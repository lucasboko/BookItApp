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

 
  return (
    <APIProvider apiKey={GOOGLE_MAP_API_KEY} solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
      <div className='h-screen w-screen'>
        <Header />
        <Content />
        <Footer />
      </div>
    </APIProvider>
  )
}