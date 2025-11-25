import { useState } from 'react'
import { CardContainer } from './CardContainer'
import { InputText } from './InputText'

export const CardInputContainer = () =>{
    const [content, setContent] = useState("")

    const handleCapturedText = (text) => {
        setContent(text)
    }

    return(
        <div className='
        overflow-hidden
        flex flex-col
        h-full
        border border-slate-300 rounded-xl
        w-2/4
        bg-slate-100'> 
            <CardContainer
            content={content}/>

            <InputText
            capturedText={handleCapturedText}
            />
        </div>
    )
}