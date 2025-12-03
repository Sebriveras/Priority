import { useState, useEffect } from 'react';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';

const IconCatalog = {
    light : LightModeOutlinedIcon,
    dark : NightlightOutlinedIcon,
};

const layoutCatalog = {
    light : 'justify-start',
    dark : 'justify-end'
}

export const ThemeSwitch = ({dark}) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Leer el estado guardado en localStorage
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark"; // retorna true o false
    });

    // Aplicar el tema + guardarlo en localStorage
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleOnClick = () => {
        setDarkMode(prev => !prev);
        dark(!darkMode)
    };

    const mode = darkMode ? 'dark' : 'light';
    const Icon = IconCatalog[mode];

    return(
        <div className='flex flex-row items-center justify-start gap-2.5'>
            <p className='font-regular text-slate-400 dark:text-slate-500'>
                {mode === 'light' ? 'Light' : 'Dark'}
            </p>
            
            <div 
                className={`
                    flex flex-row items-center ${layoutCatalog[mode]} w-17 p-1
                    rounded-full border border-slate-300 dark:border-slate-500
                    bg-slate-100 dark:bg-slate-800 cursor-pointer
                `}
                onClick={handleOnClick}
            >
                <div className='
                    flex items-center justify-center w-9 h-9 
                    rounded-full bg-amber-100 dark:bg-cyan-100
                    transition-all duration-300'
                >
                    <Icon className='text-amber-600 dark:text-cyan-600'/>
                </div>
            </div>
        </div>
    );
}
