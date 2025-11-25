import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {Checkbox} from '../Microcomponents/Checkbox.jsx'

import SnoozeIcon from '@mui/icons-material/SnoozeOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CampaignIcon from '@mui/icons-material/CampaignOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHighOutlined';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlertOutlined';

const types = {
    veryLow : <SnoozeIcon className='text-stone-400'/>,
    low : <AdjustOutlinedIcon className='text-blue-500'/>,
    medium : <CampaignIcon className='text-orange-500'/>,
    high : <PriorityHighIcon className='text-red-500'/>,
    veryHigh : <CrisisAlertIcon className='text-purple-500'/>,
}

const borderColor = (type) => {
    if (type === "high") return "border border-red-500";
    if (type === "veryHigh") return "border border-purple-500";
    return "border border-transparent"; 
};

const textOpacity = (type) => {
    if (type === "veryLow") return "text-stone-400"
    return "text-stone-700"
}

export const TaskCard = ({type, position, content, posBack}) => {
    const {
        attributes, listeners, setNodeRef, transform,
    } = useSortable({
        id: position
    })

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    };
    //Hacer que el texto no sea seleccionable
    return(
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className={`
                flex flex-row 
                items-center
                w-full h-12
                px-2.5
                gap-2
                rounded-md
                ${borderColor(type)}
                bg-slate-50 
                shadow-[0_1px_4px_rgba(0,0,0,0.20)]
                cursor-grab
                select-none
            `}
        >
            
        <div 
        {...listeners}
        className='flex w-full gap-2'>
            {types[type] || null}
            <p className={`w-full text-start text-base ${textOpacity(type)}`}>{content}</p>  
        </div>

        <Checkbox
        clicked={() => posBack(position)}/>
        </div>
    )
}