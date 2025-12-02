import { MenuOption } from '../Microcomponents/MenuOption';

export const Menu = ({onOptionClick}) => {

    return(
        <div 
        className="flex flex-col p-3 border border-slate-300 rounded-xl bg-slate-50 shadow-md">
            <MenuOption
            type={'edit'}
            title={'Edit'}
            onOptionClick={onOptionClick}/>

            <MenuOption
            type={'remove'}
            title={'Remove'}
            onOptionClick={onOptionClick}/>
        </div>
    )
}