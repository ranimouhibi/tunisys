
import MiniCalendar from 'components/calendar/MiniCalendar';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feries from 'views/admin/default/components/Feries';
import Solde from 'views/admin/default/components/Solde';
import Event from 'views/admin/default/components/event';
import Demande from 'views/admin/default/components/demande';


import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import ApexChart from './chart';

const Home = () => {


  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-3">

        <Solde />
        <Demande/>
        <ApexChart/>
           
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-3">
  
        <Feries />
        <Event/>
        <MiniCalendar />

      </div>

    </div>
      )
}

export default Home