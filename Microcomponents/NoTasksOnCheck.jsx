import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const NoTasksOnCheck = () => {
    return(
        <div className='
            flex flex-col
            items-center justify-center
            gap-5
            h-full'>
            <div className="
            flex flex-col
            items-center justify-center
            gap-1.5">
                <p className='text-xl font-semibold text-slate-400 dark:text-slate-500'>No completed tasks yet</p>
                <p className='text-slate-400 dark:text-slate-500'>Add tasks and mark them as done to see them here</p>
            </div>
            
            <div className='flex flex-row 
            items-center justify-center 
            py-2 pl-3.5 pr-4
            rounded-md
            gap-2 bg-slate-200 dark:bg-slate-700'>
                <ErrorOutlineOutlinedIcon className='text-slate-400 dark:text-slate-400' fontSize='small'/>
                <p className='text-sm font-medium text-slate-400 dark:text-slate-400'>Completed tasks are removed every day</p>
            </div>
            
        </div>
    )
}