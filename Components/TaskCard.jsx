import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {Checkbox} from '../Microcomponents/Checkbox.jsx'

import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SnoozeIcon from '@mui/icons-material/SnoozeOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CampaignIcon from '@mui/icons-material/CampaignOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHighOutlined';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlertOutlined';

const types = {
    done : <SentimentSatisfiedAltOutlinedIcon className='text-emerald-500'/>,
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
    if (type === "done") return "text-stone-400 line-through"
    return "text-stone-700"
}

const isChecked = (type) => {
   const checked = type === "done" ? true : false
   return checked
}


export const TaskCard = ({type, index, content, posBack}) => {
    const { attributes, listeners, setNodeRef, transform } = 
    useSortable({ id: index })

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    };

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
        `}>
            
            <div 
            {...listeners}
            className='flex w-full gap-2'>
                {types[type] || null}
                <p className={`w-full text-start text-base ${textOpacity(type)}`}>{content}</p> 

            </div>

            <Checkbox
            isClicked={() => posBack(index, type)}
            isChecked={isChecked(type)}/>

        </div>
    )
}