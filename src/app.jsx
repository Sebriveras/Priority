import './app.css'
import { CardInputContainer } from '../Components/CardInputContainer'
import { Header } from '../Components/Header'
import { UserProvider } from '../Contexts/UserProvider'

export function App() {
  return (
    <UserProvider>
      <div className='
      flex flex-col
      items-center
      gap-1
      pb-8
      w-screen h-screen max-h-screen 
      bg-slate-50
      '>
        <Header/>
        <CardInputContainer/>
      </div>
    </UserProvider>

  )
}
