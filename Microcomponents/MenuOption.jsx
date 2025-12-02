import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const IconType = {
    edit : DeleteOutlineOutlinedIcon,
    remove : EditOutlinedIcon
};

const iconColor = {
    remove : 'text-red-600',
    default : 'text-slate-600'
};

export const MenuOption = ({type, title, onOptionClick}) => {
    const Icon = IconType[type];
    const selectedColor = iconColor[type] || iconColor['default']

    return(
        <div className="
        flex flex-row items-center justify-start 
        h-10 pl-3 pr-4 gap-1.5 rounded-md 
        bg-slate-50 cursor-pointer
        hover:bg-slate-100
        active:bg-slate-200"
        onClick={() => onOptionClick(type)}>
            <Icon className={`${selectedColor}`}/>
            <p className="font-normal text-slate-700">{title}</p>
        </div>
    )
}