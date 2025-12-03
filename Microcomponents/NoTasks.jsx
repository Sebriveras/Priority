import AddIcon from '@mui/icons-material/Add';

export const NoTasks = () => {
    return(
        <div className='
            flex flex-col
            items-center justify-center
            gap-4 
            h-full'>
                
            <p className='text-xl font-semibold text-slate-400 dark:text-slate-500'>You don’t have any tasks yet</p>

            <div className="flex items-center justify-center gap-2.5">
                <p className='text-slate-400 dark:text-slate-500'>click on</p>

                <div className="
                flex
                pl-1 pr-2.5 py-1
                gap-1
                rounded-md border border-slate-400 dark:border-slate-400 text-slate-400 dark:text-slate-400
                bg-slate-50 dark:bg-slate-700 
                font-medium">

                <AddIcon/>
                <p>New task</p></div>
                <p className='text-slate-400 dark:text-slate-500'>to begin organizing your day.</p>
            </div>
        </div>
    )
}