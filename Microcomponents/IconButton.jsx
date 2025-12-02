import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const typeColor = {
    main :'text-blue-600',
    default : 'text-slate-600',
    disabled : 'text-slate-400',
};

const IconDic = {
    moreActions : MoreVertIcon,
    save : SaveOutlinedIcon,
    cancel : CloseOutlinedIcon,
    edit : EditOutlinedIcon,
}

const buttonColorState = {
    default : '',
    hover :  'bg-slate-100',
    active : 'bg-slate-200',
}

export const IconButton = ({icon, type, onButtonClick}) => {
    const [colorState, setColorState] = useState('default')

    const Icon = IconDic[icon] || IconDic.save;
    const color = typeColor[type] || typeColor.default;

    return(
        <div className={`
        flex items-center 
        justify-center 
        w-8 h-8
        rounded-xl
        cursor-pointer
       ${buttonColorState[colorState]}`}
        onMouseEnter= {() => setColorState('hover')}
        onMouseLeave= {() => setColorState('default')}
        onMouseDown=  {() => setColorState('active')}
        onMouseUp=    {() => setColorState('hover')}
        onClick=      {onButtonClick}>

            <Icon className={color}/>

        </div>
    )
}