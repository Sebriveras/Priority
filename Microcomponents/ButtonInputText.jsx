export const ButtonInputText = ({state, handleClick}) =>{
    const activeStyle = "active:bg-blue-100"

    const defaultStyle = (s) => {
        if(s) return "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
        return "border-slate-400 dark:border-slate-400 text-slate-400 dark:text-slate-400"
    }

    return(
        <button
            className={`
                px-1.5 py-1
                rounded-md border ${defaultStyle(state)}
                bg-slate-50 dark:bg-slate-700
                font-medium
                cursor-pointer
                transition-all
                ${state && activeStyle}
            `}
            onClick={handleClick}
            >
            <p>Enter</p>
        </button>
    )
}

