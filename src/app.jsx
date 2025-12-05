import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';

import { useState } from 'react';

import { CardInputContainer } from '../Components/CardInputContainer';
import { Header } from '../Components/Header';

import { ButtonSupport } from '../Microcomponents/ButtonSupport';
import { DonationPopUp } from '../Components/DonationPopUp'

/*git add .
git commit -m "primer commit"
git push -u origin main*/

export function App() {
  const [donationPopUp, setDontationOpenPopUp] = useState(false)

  const handleOnClick = () => {
    console.log('button s')
  }

  return (
    <div className='w-screen h-screen'>
      <div className='
      hidden
      w-full h-full
      items-center
      gap-1
      bg-slate-50 dark:bg-slate-900
      
      sm:flex flex-col'>
        <Header/>
        <CardInputContainer/>
        <div className="
        fixed bottom-8 right-12
        
          sm:
          md:
          lg:
          xl:
          2xl:">
          <ButtonSupport onClick={ () => setDontationOpenPopUp(true) }/>
        </div>

        { donationPopUp && ( <DonationPopUp onClose={ () => setDontationOpenPopUp(false) }/> )}
      </div>

      <div className='flex flex-col w-full h-full p-4 gap-4 items-center justify-center bg-slate-900 sm:hidden'>
        <DesktopWindowsOutlinedIcon fontSize='large'/>
        <p className='font-semibold text-2xl text-center text-slate-50'>Priority app is only available on desktop devices</p>
        <p className='text-lg text-center text-slate-50'>Please access this app from a desktop device.</p>
      </div>
    </div>
  )
}
