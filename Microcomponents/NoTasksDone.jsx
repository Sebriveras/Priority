import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

export const NoTasksDone = () => {
    return (
        <div className="
            flex flex-col
            items-center justify-center
            gap-2 
            h-full
        ">
            <div className="text-5xl text-emerald-500">
                <SelfImprovementIcon fontSize="inherit" />
            </div>

            <div className='flex flex-col gap-1'>
                <p className="text-xl font-semibold text-emerald-500 ">All Tasks Complete.</p>
                <p className="text-emerald-500">Your focus is paying off.</p>
            </div>
        </div>
    )
}
