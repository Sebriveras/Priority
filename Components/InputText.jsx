import AddIcon from '@mui/icons-material/Add';
import { useState, useRef, useEffect } from "react";
import { ButtonInputText } from '../Microcomponents/ButtonInputText';

export const InputText = ({ capturedText, onInputEvent }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    const editingRef = useRef(false);

    const isButtonActive = text.trim().length > 0;

    const submitTask = () => {
        if (!isButtonActive) return;

        capturedText(text);
        setText("");                // limpiar input
        onInputEvent("task-submitted"); // avisar al padre
        // ❗ NO cerramos el input con setEditing(false)
    };

    // Manejo del enfoque cuando se abre el input
    useEffect(() => {
        editingRef.current = editing;
        if (editing) inputRef.current?.focus();
    }, [editing]);

    // Cerrar al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                editingRef.current &&
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target)
            ) {
                setEditing(false);
                onInputEvent("input-closed");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="
                flex flex-row items-center justify-items-start
                h-14 w-full py-3 px-3 gap-2 
                border-t border-slate-300 dark:border-slate-600
                cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900
            "
            onClick={() => {
                if (!editing) {
                    setEditing(true);
                    onInputEvent("input-opened");
                }
            }}
        >
            {!editing ? (
                <>
                    <AddIcon className='text-blue-600 dark:text-blue-400' />
                    <p className="font-medium text-blue-600 dark:text-blue-400">New task</p>
                </>
            ) : (
                <>
                    <input
                        ref={inputRef}
                        className="
                            w-full text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-400
                            outline-none border-none
                        "
                        type='text'
                        placeholder='Write your task and press Enter...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitTask()}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <ButtonInputText
                        state={isButtonActive}
                        handleClick={(e) => {
                            e.stopPropagation();
                            submitTask();
                        }}
                    />
                </>
            )}
        </div>
    );
};
