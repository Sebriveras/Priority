import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const IconType = {
    edit :  EditOutlinedIcon,
    remove : DeleteOutlineOutlinedIcon
};

const iconColor = {
    remove : 'text-red-600 dark:text-red-400',
    default : 'text-slate-600 dark:text-slate-300'
};

export const MenuOption = ({type, title, onOptionClick}) => {
    const Icon = IconType[type];
    const selectedColor = iconColor[type] || iconColor['default']

    return(
        <div className="
        flex flex-row items-center justify-start 
        h-10 pl-3 pr-4 gap-1.5 rounded-md 
        bg-slate-50 dark:bg-slate-800 cursor-pointer
        hover:bg-slate-100 dark:hover:bg-slate-700
        active:bg-slate-200 dark:active:bg-slate-600"
        onClick={() => onOptionClick(type)}>
            <Icon className={`${selectedColor}`}/>
            <p className="font-normal text-slate-700 dark:text-slate-100">{title}</p>
        </div>
    )
}