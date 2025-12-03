import { useRef, useEffect, useState } from "react";
import { IconButton } from "./IconButton";

export const CardInputText = ({ content, onSave, switchState }) => {
    const [text, setText] = useState(content);

    const wrapperRef = useRef(null);  // 👈 Nuevo ref para todo el componente
    const inputRef = useRef(null);

    const changesOnText = content === text;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // 👇 Detecta clic fuera del componente
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                switchState("default");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => setText(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") return switchState("default");
        if (e.key === "Enter") {
            e.preventDefault();
            if (!changesOnText) handleClick();
        }
    };

    const handleClick = () => {
        if (!changesOnText) {
            onSave(text);
            switchState("default");
        }
    };

    return (
        <div
            ref={wrapperRef}  // 👈 Se agrega el ref
            className="flex flex-row items-center 
            px-3 w-full h-full 
            bg-blue-50 dark:bg-slate-700 rounded-md 
            outline outline-2 outline-blue-600 dark:outline-blue-400 outline-offset-0"
        >
            <input
                ref={inputRef}
                aria-label="Editar texto"
                className="flex w-full text-slate-700 dark:text-slate-100 placeholder-slate-700 dark:placeholder-slate-200 outline-none border-none"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
            />

            <IconButton
                icon="save"
                type={changesOnText ? "disabled" : "main"}
                onButtonClick={handleClick}
            />
        </div>
    );
};
