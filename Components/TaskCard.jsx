import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IconButton } from '../Microcomponents/IconButton.jsx';
import { Checkbox } from '../Microcomponents/Checkbox.jsx';
import { CardInputText } from '../Microcomponents/CardInputText.jsx';

import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SnoozeIcon from '@mui/icons-material/SnoozeOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import CampaignIcon from '@mui/icons-material/CampaignOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHighOutlined';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlertOutlined';

const IconTypes = {
    done: SentimentSatisfiedAltOutlinedIcon,
    veryLow: SnoozeIcon,
    low: AdjustOutlinedIcon,
    medium: CampaignIcon,
    high: PriorityHighIcon,
    veryHigh: CrisisAlertIcon
};

const iconColors = {
    done: 'text-emerald-500',
    veryLow: 'text-stone-400',
    low: 'text-blue-500',
    medium: 'text-orange-500',
    high: 'text-red-500',
    veryHigh: 'text-purple-500',
    default: 'text-stone-400',
};

const textStyles = {
    veryLow: "text-stone-400",
    done: "text-stone-400 line-through",
    default: "text-stone-700",
};

const borderColors = {
    high: "border border-red-500",
    veryHigh: "border border-purple-500",
    default: "border border-transparent"
};

export const TaskCard = ({ type, index, content, newContent, posBack }) => {

    const [cardMode, setCardMode] = useState('default');

    const handleOnSave = (x) => {
        const pack = { index, x };
        newContent(pack);
    };

    const { attributes, listeners, setNodeRef, transform } =
        useSortable({ id: index });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    };

    const Icon = IconTypes[type];
    const iconColor = iconColors[type];
    const borderClass = borderColors[type] || borderColors.default;
    const textClass = textStyles[type] || textStyles.default;
    const checked = type === 'done';

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className={`
                flex flex-row items-center
                w-full h-12 max-h-11 px-3 gap-3
                rounded-md cursor-grab select-none
                bg-slate-50 shadow-[0_1px_4px_rgba(0,0,0,0.20)]
                ${borderClass}
            `}
        >

            {cardMode === 'default' && (
                <>
                    <div {...listeners} className='flex w-full gap-3'>
                        {Icon && <Icon className={iconColor} />}
                        <p className={`w-full text-start text-base ${textClass}`}>
                            {content}
                        </p>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-1'>

                        {/* ⛔ Ocultar botón de editar cuando la tarea es DONE */}
                        {type !== 'done' && (
                            <IconButton
                                icon={'edit'}
                                type={'deafult'}
                                onButtonClick={() => setCardMode('edit')}
                            />
                        )}

                        <Checkbox
                            isClicked={() => posBack(index, type)}
                            isChecked={checked}
                        />
                    </div>
                </>
            )}

            {cardMode === 'edit' && (
                <>
                    <div className='flex flex-row items-center justify-start w-full h-full gap-4'>
                        {Icon && <Icon className={iconColor} />}
                        <CardInputText
                            content={content}
                            onSave={handleOnSave}
                            switchState={(state) => setCardMode(state)}
                        />
                    </div>

                    <IconButton
                        icon={'cancel'}
                        type={'deafult'}
                        onButtonClick={() => setCardMode('default')}
                    />
                </>
            )}
        </div>
    );
};
