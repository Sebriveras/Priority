import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import AddIcon from '@mui/icons-material/Add';

export const NoTasks = () => {
    return(
        <div className='
            flex flex-col
            items-center justify-center
            gap-4 
            h-full'>

            <div className="flex flex-col items-center justify-center gap-6">
                <div className='flex flex-row items-center justify-center gap-3'>
                    <p className='text-slate-400 dark:text-slate-400'>Click on</p>

                    <div className="
                    flex
                    pl-1 pr-2.5 py-1
                    gap-1
                    rounded-md border border-slate-400 dark:border-slate-400 text-slate-400 dark:text-slate-400
                    bg-slate-50 dark:bg-slate-700 
                    font-medium">
                    
                        <AddIcon className='dark:text-slate-300'/>
                        <p className='dark:text-slate-300'>New task</p>
                    </div>
                    <p className='text-slate-400 dark:text-slate-400'>to start organizing your day.</p>
                </div>


                <div className='flex flex-row 
                    items-center justify-center 
                    py-2 pl-4 pr-3.5
                    rounded-md
                    gap-2 bg-slate-200 dark:bg-slate-700'>
                        
                    <p className='text-sm font-medium text-slate-500 dark:text-slate-300'>You can rearrange tasks anytime with drag and drop</p>
                    <PanToolOutlinedIcon className='text-slate-500 dark:text-slate-300' fontSize='small'/>
                </div>
            </div>
        </div>
    )
}