import IconLight from "../Microcomponents/IconLight"
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Header = () =>{

    return(
        <div 
            className="flex
            items-center
            justify-between
            px-8
            w-full h-24">

            <IconLight/>

            <button className="
            flex flex-row 
            items-center justify-center
            py-2 px-4 gap-2
            border-[1.7px] border-pink-600 rounded-full
            bg-pink-100 shadow-md cursor-pointer">
                <FavoriteIcon className="text-pink-600"/>
                <p className="text-pink-600 font-medium">Support this project</p>
            </button>
        </div>
    )
}