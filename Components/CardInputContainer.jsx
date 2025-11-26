import { useState } from 'react'
import { CardContainer } from './CardContainer'
import { InputText } from './InputText'
import { Switch } from '../Microcomponents/Switch'

export const CardInputContainer = () =>{
    const [content, setContent] = useState("")

    const handleCapturedText = (text) => {
        setContent(text)
    }

    return(
        <div className='
        flex flex-row
        items-start justify-center
        h-full
        w-1/2'>
            <div className='w-8'></div>

            <div className='
                overflow-hidden
                flex flex-col
                h-full w-full
                border border-slate-300 
                rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl
                bg-slate-100'>  

                <CardContainer
                content={content}/>

                <InputText
                capturedText={handleCapturedText}/>
            </div> 

            <Switch/>
        </div>
    )
}