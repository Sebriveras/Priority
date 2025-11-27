import { useState } from 'react'
import { CardContainer } from './CardContainer'
import { InputText } from './InputText'
import { Switch } from '../Microcomponents/Switch'

export const CardInputContainer = () => {
    const [content, setContent] = useState("")
    const [switchMode, setSwitchMode] = useState("pending")

    const handleInputEvent = (event) => {
        if (event === "input-opened") {
            // Si el user abre el input, nos aseguramos de estar en pending
            setSwitchMode("pending")
        }

        if (event === "task-submitted") {
            // Solo por si en futuro quieres hacer algo
        }

        if (event === "input-closed") {
            // Aquí podrías manejar algo luego si lo necesitas
        }
    }

    const handleCapturedText = (text) => {
        setContent(text)
    }

    const handleSwitch = (mode) => {
        setSwitchMode(mode)
    }

    return (
        <div className='flex flex-row items-start justify-center h-screen max-h-screen w-1/2'>
            <div className='w-8'></div>

            <div className='
            flex flex-col
            w-full h-full
            border border-slate-300 rounded-tl-xl rounded-bl-xl rounded-br-xl 
            bg-slate-100'>

                <CardContainer
                    content={content}
                    switchMode={switchMode}
                />

                <InputText
                    capturedText={handleCapturedText}
                    onInputEvent={handleInputEvent}
                />
            </div>

            <Switch 
                mode={handleSwitch}
                externalMode={switchMode}
            />
        </div>
    )
}
