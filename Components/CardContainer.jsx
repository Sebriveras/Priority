import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

import { useState, useEffect } from 'react'

import { TaskCard } from '../Components/TaskCard'
import { NoTasks } from '../Microcomponents/NoTasks'
import { NoTasksDone } from '../Microcomponents/NoTasksDone'
import { NoTasksOnCheck } from '../Microcomponents/NoTasksOnCheck'


// ----------------------------------------------------------
// TITLES, TEMPLATE, URGENCY — sin cambios
// ----------------------------------------------------------
const titles = {
    done : <p className='text-sm font-semibold text-emerald-500 select-none'>Completed tasks</p>,
    veryLow : <p className='text-sm font-semibold text-gray-400 select-none'>Ignore for now</p>,
    low : <p className='text-sm font-semibold text-indigo-500 select-none'>Can wait</p>,
    medium : <p className='text-sm font-semibold text-orange-500 select-none'>Needs attention</p>,
    high : <p className='text-sm font-semibold text-red-500 select-none'>Urgent</p>,
    veryHigh : <p className='text-sm font-semibold text-purple-500 select-none'>Critical</p>,
};

const getTemplate = (size) => {
    if(size < 3){return { veryHigh: 0 , high: 0 , medium: 0 , low: 1 , veryLow: 0}}
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
        if (index < scope) return key;
    }
};

const getTitle = (urg, prevUrg) => {
    if (urg !== prevUrg) return titles[urg];
    return null;
};


// ----------------------------------------------------------
// CONTAINER
// ----------------------------------------------------------
export function CardContainer({ content, switchMode}) {

    const [arrayCards, setArrayCards] = useState([]);
    const [arrayDoneCards, setArrayDoneCards] = useState([]);
    const [taskCreated, setTaskCreated] = useState(false);

    // 🔥 NUEVO ESTADO: SOLO UNA CARD EN MODO EDICIÓN
    const [editingId, setEditingId] = useState(null);


    // ----------------------------------------------------------
    // LOCAL STORAGE Y ESTADOS — SIN CAMBIOS
    // ----------------------------------------------------------
    useEffect(() => {
        const savedArrayCards = JSON.parse(localStorage.getItem("arrayCards"));
        const savedArrayDoneCards = JSON.parse(localStorage.getItem("arrayDoneCards"));
        const savedDate = localStorage.getItem("lastSavedDate");

        const today = new Date().toDateString();
        const isNewDay = savedDate !== today;

        if (isNewDay) {
            localStorage.removeItem("arrayDoneCards");
            localStorage.setItem("lastSavedDate", today);
        }

        if (savedArrayCards && Array.isArray(savedArrayCards)) {
            setArrayCards(savedArrayCards);
            setTaskCreated(savedArrayCards.length > 0);
        }

        if (!isNewDay && savedArrayDoneCards && Array.isArray(savedArrayDoneCards)) {
            setArrayDoneCards(savedArrayDoneCards);
        }

    }, []);

    useEffect(() => {
        if (!content) return;
        setArrayCards(prev => [content, ...prev]);
    }, [content]);

    useEffect(() => {
        if (arrayCards.length > 0) setTaskCreated(true);
    }, [arrayCards.length]);

    useEffect(() => {
        localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
        localStorage.setItem("lastSavedDate", new Date().toDateString());
    }, [arrayCards]);

    useEffect(() => {
        localStorage.setItem("arrayDoneCards", JSON.stringify(arrayDoneCards));
    }, [arrayDoneCards]);

    const handleRemove = (indexToRemove) => {
        setArrayCards(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    // ----------------------------------------------------------
    // CAMBIAR ESTADO DONE / PENDING — SIN CAMBIOS
    // ----------------------------------------------------------
    const statusTaskChanged = (index, type) => {

        // Si la card que se mueve estaba en edición → resetear edición
        if (editingId === index) setEditingId(null);

        if (type === 'done') {
            setArrayDoneCards(prev => {
                const task = prev[index];
                setArrayCards(cards => [...cards, task]);
                return prev.filter((_, i) => i !== index);
            });
        } else {
            setArrayCards(prev => {
                const task = prev[index];
                setArrayDoneCards(done => [...done, task]);
                return prev.filter((_, i) => i !== index);
            });
        }
    };


    // ----------------------------------------------------------
    // ACTUALIZAR CARD (EDIT) — SIN CAMBIOS
    // ----------------------------------------------------------
    const updateCardContent = (pack) => {
        setArrayCards(prev =>
            prev.map((item, i) => (i === pack.index ? pack.x : item))
        );

        // 🔥 Al guardar → cerrar edición
        setEditingId(null);
    };


    // ----------------------------------------------------------
    // DRAG & DROP — SIN CAMBIOS
    // ----------------------------------------------------------
    const handleDragEnd = (event) => {
        const { active, over } = event;
        setArrayCards(()=>{
            const oldIndex = active.id;
            const newIndex = over.id;
            return arrayMove(arrayCards, oldIndex, newIndex)
        });
    };


    // ----------------------------------------------------------
    // SCREEN STATE — SIN CAMBIOS
    // ----------------------------------------------------------
    const screenState = (() => {
        if (arrayCards.length === 0 && !taskCreated && switchMode === 'pending') return "no-tasks-created-yet";
        if (arrayCards.length === 0 && taskCreated && switchMode === 'pending') return "no-tasks-all-done";
        if (arrayCards.length > 0 && switchMode === 'pending') return "tasks-created-on-pending"

        if (arrayDoneCards.length > 0 && switchMode === 'check') return "tasks-completed-on-check"
        if (arrayDoneCards.length === 0 && switchMode === 'check') return "no-taks-on-check"
    })();


    // ----------------------------------------------------------
    // RENDER
    // ----------------------------------------------------------
    return (
        <div className='overflow-y-auto flex flex-col h-full py-1.5 px-3 gap-2'>

            {(screenState === "tasks-created-on-pending") && (
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
                                        index={index}
                                        content={card}
                                        remove={handleRemove}

                                        newContent={updateCardContent} 
                                        posBack={statusTaskChanged}

                                        // 🔥 PASAMOS ESTO
                                        editingId={editingId}
                                        setEditingId={setEditingId}
                                    />
                                </div>
                            );
                        })}
                    </SortableContext>
                </DndContext>
            )}

            {screenState === "tasks-completed-on-check" && (
                arrayDoneCards.map((card, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                        {index === 0 && titles.done}

                        <TaskCard
                            id={index}
                            type={"done"}
                            index={index}
                            content={card} 
                            remove={handleRemove}
                            newContent={(x)=>{console.log(x)}} 
                            posBack={statusTaskChanged}

                            editingId={editingId}
                            setEditingId={setEditingId}
                        />
                    </div>
                ))
            )}

            {screenState === "no-tasks-created-yet" && <NoTasks/>}
            {screenState === "no-tasks-all-done" && <NoTasksDone/>}
            {screenState === "no-taks-on-check" && <NoTasksOnCheck/>}

        </div>
    );
}
