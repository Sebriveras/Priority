import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

import { useState, useEffect } from 'react'

import { TaskCard } from '../Components/TaskCard'
import { NoTasks } from '../Microcomponents/noTasks'
import { NoTasksDone } from '../Microcomponents/NoTasksDone'

const titles = {
    veryLow : <p className='text-sm font-semibold text-gray-400 select-none'>Ignore for now</p>,
    low : <p className='text-sm font-semibold text-blue-500 select-none'>Can wait</p>,
    medium : <p className='text-sm font-semibold text-orange-500 select-none'>Needs attention</p>,
    high : <p className='text-sm font-semibold text-red-500 select-none'>Urgent</p>,
    veryHigh : <p className='text-sm font-semibold text-purple-500 select-none'>Critical</p>,
};

const getTemplate = (size) => {
    if(size < 3){return { veryHigh: 0 , high: 0 , medium: 0 , low: 1 , veryLow: 0 }}
    if(size < 6){return { veryHigh: 0 , high: 0 , medium: 0.3 , low: 0.7 , veryLow: 0 }}
    if(size < 8){return { veryHigh: 0 , high: 0.15 , medium: 0.4 , low: 0.45 , veryLow: 0 }}
    if(size < 9){return { veryHigh: 0.1 , high: 0.15 , medium: 0.3 , low: 0 , veryLow: 0.55 }}
    return { veryHigh: 0.1 , high: 0.3 , medium: 0 , low: 0 , veryLow: 0.6 }
}

const getUrgency = (size, index) => {
    const distribution = getTemplate(size);
    let acumPercent = 0;

    for (const [key, value] of Object.entries(distribution)) {

        acumPercent += value;
        const scope = size * acumPercent;

        if (index < scope) {
            return key;
        }
    }
};

const getTitle = (urg, prevUrg) => {
    if (urg !== prevUrg) {
        return titles[urg];
    }
    return null;
};

export function CardContainer({ content }) {
    const [arrayCards, setArrayCards] = useState([]);
    const [taskCreated, setTaskCreated] = useState(false);
    //Cargar array del local storage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("arrayCards"));
        const savedDate = localStorage.getItem("lastSavedDate");

        const today = new Date().toDateString();

        if (savedDate !== today) {
            localStorage.removeItem("arrayCards");
            localStorage.setItem("lastSavedDate", today);
            return; // No cargamos nada viejo
        }

        if(saved && Array.isArray(saved)){
            setArrayCards(saved)
            setTaskCreated(saved.length > 0);
        }
    }, [])
    //Guardar nuevas tareas
    useEffect(() => {
        if (!content) return;
        setArrayCards(prev => [content, ...prev]);
    }, [content]);
    //Establecer si una tarea fue creada por primera vez
    useEffect(() => {
        if (arrayCards.length > 0) setTaskCreated(true);
    }, [arrayCards.length]);
    //Guardar array en el local storage cuando arrayCards cambie
    useEffect(() => {
        localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
        localStorage.setItem("lastSavedDate", new Date().toDateString());
    }, [arrayCards]);

    const screenState = (() => {
        if (arrayCards.length === 0 && !taskCreated) return "empty-first";
        if (arrayCards.length === 0 && taskCreated) return "empty-done";
        return "non-empty";
    })();

    const doneTask = (index) => {
        setArrayCards(prev => prev.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        setArrayCards(()=>{
            const oldIndex = active.id;
            const newIndex = over.id;

            return arrayMove(arrayCards, oldIndex, newIndex)
        });
    };

    return (
        <div className='overflow-y-auto flex flex-col h-full py-2 px-3 gap-1.5'>

            {screenState === "non-empty" && (
                <DndContext 
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={arrayCards.map((_, i) => i)}
                        strategy={verticalListSortingStrategy}
                    >
                        {arrayCards.map((card, index) => {
                            const urg = getUrgency(arrayCards.length, index);
                            const prevUrg = index > 0 ? getUrgency(arrayCards.length, index - 1) : null;

                            return (
                                <div key={index} className='flex flex-col gap-2'>
                                    {getTitle(urg, prevUrg)}
                                    <TaskCard
                                        id={index}
                                        type={urg}
                                        position={index}
                                        content={card}
                                        posBack={doneTask}
                                    />
                                </div>
                            );
                        })}
                    </SortableContext>
                </DndContext>
            )}

            {screenState === "empty-first" && <NoTasks />}
            {screenState === "empty-done" && <NoTasksDone />}

        </div>
    );
}
