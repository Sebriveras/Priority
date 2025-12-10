import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const styleCatalog = {
    Icon: {
        moreActions : MoreVertIcon,
        save : SaveOutlinedIcon,
        cancel : CloseOutlinedIcon,
        edit : EditOutlinedIcon,
    },

    textColor : {
        main :'text-blue-600 dark:text-blue-400',
        default : 'text-slate-600 dark:text-slate-400',
        disabled : 'text-slate-400 dark:text-slate-500',
    },
}

export const IconButton = ({icon, type, onButtonClick}) => {
    const Icon = styleCatalog.Icon[icon] || styleCatalog.Icon.save;
    const textColor = styleCatalog.textColor[type] || typeColor.textColor.default;

    return(
        <div className={`
        flex items-center 
        justify-center 
        w-8 h-8 rounded-xl
        cursor-pointer
       
        ${type != 'disabled' && 
            'hover:bg-slate-300/30 hover:dark:bg-slate-50/5 active:bg-slate-300/50 active:dark:bg-slate-50/15'}
        `}

        onClick={onButtonClick}>

            <Icon className={textColor}/>

        </div>
    )
}