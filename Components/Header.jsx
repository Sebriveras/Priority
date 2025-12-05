import { ThemeSwitch } from '../Microcomponents/ThemeSwitch';

import IconLight from "../Microcomponents/IconLight"
import IconDark from '../Microcomponents/IconDark';



export const Header = () => {

    return (
        <div 
        className="
        flex items-center justify-between
        w-full h-24 px-12 py-12
        
        sm:
        md:
        lg:
        xl:
        2xl:">
            <div>
                <div className='dark:hidden'><IconLight/></div>
                <div className='hidden dark:block'><IconDark/></div>
            </div>
            
            <ThemeSwitch/>
        </div>
    );
};
