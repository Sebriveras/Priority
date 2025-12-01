import { useRef, useEffect, useState } from "react";
import { IconButton } from "./IconButton";

export const CardInputText = ({ content, onSave, switchState }) => {
    const [text, setText] = useState(content)
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleClick = () => {
        onSave(text);
        switchState("default");
    };

    return (
        <div className="flex flex-row items-center px-3 w-full h-full bg-blue-50 rounded-md outline outline-2 outline-blue-600 outline-offset-0">
            <input
                ref={inputRef}
                className="flex w-full text-slate-700 placeholder-slate-700 outline-none border-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
                type="text"
            />

            <IconButton
                icon={"save"}
                type={"main"}
                onButtonClick={handleClick}
            />
        </div>
    );
};

