export const ButtonSupport = () => {
    
    return(
        <button className="
            invisible
            flex flex-row 
            items-center justify-center
            py-2 px-4 gap-2
            border-[1.7px] border-pink-600 rounded-full
            bg-pink-100 shadow-md cursor-pointer">
                <FavoriteIcon className="text-pink-600"/>
                <p className="text-pink-600 font-medium">Support this project</p>
        </button>
    )
}