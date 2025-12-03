import { useState, useEffect } from 'react';

import { ThemeSwitch } from '../Microcomponents/ThemeSwitch';

import IconLight from "../Microcomponents/IconLight"
import IconDark from '../Microcomponents/IconDark';

const LogoCatalog = {
    light : IconLight,
    dark : IconDark
}

export const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Cargar estado del localStorage al iniciar
    useEffect(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) {
            setDarkMode(JSON.parse(saved));  // "true" -> true
        }
    }, []);

    // Guardar estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const handleDarkMode = (dark) => {
        setDarkMode(dark);
    };

    const Logo = darkMode ? LogoCatalog.dark : LogoCatalog.light;

    return (
        <div 
            className="flex
            items-center
            justify-between
            px-10
            w-full h-24"
        >
            <Logo />

            <ThemeSwitch dark={handleDarkMode} />
        </div>
    );
};
