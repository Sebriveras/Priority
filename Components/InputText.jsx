import AddIcon from '@mui/icons-material/Add';
import { useState, useRef, useEffect } from "react";
import { ButtonInputText } from '../Microcomponents/ButtonInputText';

export const InputText = ({ capturedText }) => {
    const [clicked, setClicked] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const isButtonActive = text.trim().length > 0;

    const handleClick = () => {
        if (!isButtonActive) return;
        capturedText(text);
        setText("");
    };

    const handleChange = ({ target: { value } }) => {
        setText(value);
    };

    // 🚀 Hace focus cuando se vuelve editable
    useEffect(() => {
        if (clicked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [clicked]);

    return (
        <div
            className="
                flex flex-row
                items-center
                h-14 w-full
                py-3 px-3 gap-2 
                border-t border-slate-300
                cursor-pointer
                hover:bg-slate-200
            "
            onClick={() => setClicked(true)}
        >
            {!clicked ? (
                <>
                    <AddIcon className='text-blue-600' />
                    <p className="font-medium text-blue-600">New task</p>
                </>
            ) : (
                <>
                    <input
                        ref={inputRef}   // ← 👈 referencia para enfocar
                        className='
                            w-full
                            text-slate-700
                            placeholder-slate-400
                            outline-none 
                            border-none
                        '
                        type='text'
                        placeholder='Write your task and then press Enter...'
                        value={text}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleClick();
                        }}
                    />

                    <ButtonInputText
                        state={isButtonActive}
                        handleClick={handleClick}
                    />
                </>
            )}
        </div>
    );
};
