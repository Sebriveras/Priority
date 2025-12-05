import { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';

export const ButtonSupport = ({onClick}) => {
    const [showText, setShowText] = useState(false)
    
    return(
        <button
        className="
            flex flex-row items-center justify-center gap-2
            min-w-13 p-4
            rounded-full
            bg-pink-500 text-pink-50 shadow-md
            hover:bg-pink-500 active:bg-pink-400
            cursor-pointer

            transition-all duration-200
            
            hover:pl-5 
            hover:pr-6"
            onMouseEnter={ () => setShowText(true) }
            onMouseLeave={ () => setShowText(false) }
            onClick={onClick}>
                
            <FavoriteIcon />
            {showText && <p className="font-medium">Support this project</p>}
        </button>
    )
}