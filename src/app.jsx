import { CardInputContainer } from '../Components/CardInputContainer'
import { Header } from '../Components/Header'
import { UserProvider } from '../Contexts/UserProvider'

/*git add .
git commit -m "primer commit"
git push -u origin main*/

export function App() {
  return (
    <UserProvider>
      <div className='
      flex flex-col
      items-center
      gap-1
      pb-8
      w-screen h-screen max-h-screen 
      bg-slate-50 dark:bg-slate-900
      '>
        <Header/>
        <CardInputContainer/>
      </div>
    </UserProvider>

  )
}
