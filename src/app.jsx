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
    <div className='
    flex flex-col
    items-center
    gap-1
    w-screen h-screen  
    bg-slate-50 dark:bg-slate-900
    '>
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
  )
}
