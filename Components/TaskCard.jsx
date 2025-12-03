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
import { MoreActionsMenu } from './MoreActionsMenu.jsx';

const IconTypes = {
    done: SentimentSatisfiedAltOutlinedIcon,
    veryLow: SnoozeIcon,
    low: AdjustOutlinedIcon,
    medium: CampaignIcon,
    high: PriorityHighIcon,
    veryHigh: CrisisAlertIcon
};

const iconColors = {
    done: 'text-emerald-500 dark:text-emerald-400',
    veryLow: 'text-slate-400 dark:text-slate-400',
    low: 'text-indigo-500 dark:text-indigo-400',
    medium: 'text-orange-500 dark:text-orange-400',
    high: 'text-red-500 dark:text-red-400',
    veryHigh: 'text-purple-500 dark:text-purple-400',
    default: 'text-slate-400 dark:text-slate-400',
};

const textStyles = {
    veryLow: "text-slate-400 dark:text-slate-400" ,
    done: "text-slate-400 line-through dark:text-slate-400",
    default: "text-slate-700 dark:text-slate-100",
};

const borderColors = {
    high: "border border-red-500 dark:border-red-400",
    veryHigh: "border border-purple-500 dark:border-purple-400",
    default: "border border-transparent"
};


export const TaskCard = ({
    type,
    index,
    content,
    newContent,
    remove,
    posBack,
    editingId,
    setEditingId
    }) => {

    const isEditing = editingId === index;

    const handleOnSave = (x) => {
        newContent({ index, x });
        setEditingId(null); // salir de edición
    };

    const handleOnOptionClick = (id) => {
        if(id === 'edit') return setEditingId(index)
        if(id === 'remove') return remove(index)
    };  

    const handleCancel = () => setEditingId(null);

    // Sortable (dnd-kit)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useSortable({ id: index });

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
                bg-slate-50 dark:bg-slate-700
                shadow-[0_1px_4px_rgba(0,0,0,0.20)]
                ${borderClass}
            `}
        >

            {/* ---------- VIEW MODE ---------- */}
            {!isEditing && (
                <>
                    <div {...listeners} className="flex w-full gap-3">
                        {Icon && <Icon className={iconColor} />}

                        <p className={`w-full text-start text-base ${textClass}`}>
                            {content}
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-1">
                        {/* Ocultar botón de editar cuando estado = done */}
                        {type !== 'done' && (
                            <MoreActionsMenu
                            onOptionClick={handleOnOptionClick}/>
                        )}

                        <Checkbox
                            isClicked={() => posBack(index, type)}
                            isChecked={checked}
                        />
                    </div>
                </>
            )}

            {/* ---------- EDIT MODE ---------- */}
            {isEditing && (
                <>
                    <div className="flex flex-row items-center justify-start w-full h-full gap-4">
                        {Icon && <Icon className={iconColor} />}

                        <CardInputText
                            content={content}
                            onSave={handleOnSave}
                            switchState={handleCancel}
                        />
                    </div>

                    <IconButton
                        icon="cancel"
                        type="default"
                        onButtonClick={handleCancel}
                    />
                </>
            )}

        </div>
    );
};
