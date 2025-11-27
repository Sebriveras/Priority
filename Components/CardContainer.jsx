import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

import { useState, useEffect } from 'react'

import { TaskCard } from '../Components/TaskCard'
import { NoTasks } from '../Microcomponents/NoTasks'
import { NoTasksDone } from '../Microcomponents/NoTasksDone'
import { NoTasksOnCheck } from '../Microcomponents/NoTasksOnCheck'

const titles = {
    done : <p className='text-sm font-semibold text-emerald-500 select-none'>Completed tasks</p>,
    veryLow : <p className='text-sm font-semibold text-gray-400 select-none'>Ignore for now</p>,
    low : <p className='text-sm font-semibold text-blue-500 select-none'>Can wait</p>,
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

export function CardContainer({ content, switchMode}) {
    const [arrayCards, setArrayCards] = useState([]);
    const [arrayDoneCards, setArrayDoneCards] = useState([])
    const [taskCreated, setTaskCreated] = useState(false);
    
    //Cargar array del local storage
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

        // Cargar pendientes
        if (savedArrayCards && Array.isArray(savedArrayCards)) {
            setArrayCards(savedArrayCards);
            setTaskCreated(savedArrayCards.length > 0);
        }

        // ✔ Cargar done SÓLO si no es un día nuevo
        if (!isNewDay && savedArrayDoneCards && Array.isArray(savedArrayDoneCards)) {
            setArrayDoneCards(savedArrayDoneCards);
        }

    }, []);
    //Guardar nuevas tareas
    useEffect(() => {
        if (!content) return;
        setArrayCards(prev => [content, ...prev]);
    }, [content]);
    //Establecer si una tarea fue creada por primera vez
    useEffect(() => {
        if (arrayCards.length > 0) setTaskCreated(true);
    }, [arrayCards.length]);
    //Guardar arrayCards en el local storage cuando arrayCards cambie
    useEffect(() => {
        localStorage.setItem("arrayCards", JSON.stringify(arrayCards));
        localStorage.setItem("lastSavedDate", new Date().toDateString());
    }, [arrayCards]);
    //Guardar arrayDoneCards en el local storage cuando arrayCards cambie
    useEffect(() => {
        localStorage.setItem("arrayDoneCards", JSON.stringify(arrayDoneCards));
    }, [arrayDoneCards]);
    //Convertir esto en una funcion
    const screenState = (() => {
        //Pending screens
        if (arrayCards.length === 0 && !taskCreated && switchMode === 'pending') return "no-tasks-created-yet";
        if (arrayCards.length === 0 && taskCreated && switchMode === 'pending') return "no-tasks-all-done";
        if (arrayCards.length > 0 && switchMode === 'pending') return "tasks-created-on-pending"
        //Check screens
        if (arrayDoneCards.length > 0 && switchMode === 'check') return "tasks-completed-on-check"
        if (arrayDoneCards.length === 0 && switchMode === 'check') return "no-taks-on-check"
    })();

    const statusTaskChanged = (index, type) => {

        if (type === 'done') {
            // mover desde DONE hacia PENDING
            setArrayDoneCards(prev => {
                const task = prev[index];
                setArrayCards(cards => [...cards, task]);
                return prev.filter((_, i) => i !== index);
            });
        } else {
            // mover desde PENDING hacia DONE
            setArrayCards(prev => {
                const task = prev[index];
                setArrayDoneCards(done => [...done, task]);
                return prev.filter((_, i) => i !== index);
            });
        }
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
                                        posBack={statusTaskChanged}
                                    />
                                </div>
                            );
                        })}
                    </SortableContext>
                </DndContext>
            )}
            {screenState === "tasks-completed-on-check" && (
                arrayDoneCards.map((card, index) => {

                    return(
                        <div className=' flex flex-col gap-2'>
                            {index === 0 && titles.done}

                            <TaskCard
                                id={index}
                                type={"done"}
                                index={index}
                                content={card}  
                                posBack={statusTaskChanged}
                            />
                        </div>
                    )
                })
            )}
            {screenState === "no-tasks-created-yet" && <NoTasks/>}
            {screenState === "no-tasks-all-done" && <NoTasksDone/>}
            {screenState === "no-taks-on-check" && <NoTasksOnCheck/>}

        </div>
    );
}
