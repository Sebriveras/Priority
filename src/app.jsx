import './app.css'
import { CardInputContainer } from '../Components/CardInputContainer'
import { Header } from '../Components/Header'

export function App() {
  return (
    <div className='
    flex flex-col
    items-center
    gap-6
    pb-8
    w-screen h-screen  
    bg-slate-50
    '>
      <Header/>
      <CardInputContainer/>
    </div>
  )
}
