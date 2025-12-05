import PaypalIcon from "../Microcomponents/PaypalIcon";
import KofiIcon from "../Microcomponents/KofiIcon";
import BMACIcon from "../Microcomponents/BMACIcon";

const IconCatalog = {
    paypal : PaypalIcon,
    kofi : KofiIcon,
    BMAC : BMACIcon
};

const contentCatalog = {
    paypal : {
        title: 'Paypal',
        content: 'Any value'
    },
    kofi : {
        title: 'Ko-fi',
        content: 'From $5'
    },
    BMAC : {
        title: 'Buy Me a Coffee',
        content: 'From $10'
    },
};

const linkCatalog = {
    paypal : 'https://www.paypal.com/donate/?hosted_button_id=QYS7H3D2MK69S',
    kofi : 'https://ko-fi.com/sebbrivera',
    BMAC : 'https://buymeacoffee.com/sf1x4g9yfn'
};

export const DonationCard = ({type}) => {
    const link = linkCatalog[type]
    const Icon = IconCatalog[type]
    const info = contentCatalog[type]

    const handleOnClick = () => {
        window.open(link, "_blank");
    };
    return(
        <div className="
        group
        flex flex-col items-start justify-between 
        py-3 pl-4 pr-5 h-39 min-w-42 w-full
        rounded-xl border border-slate-300 dark:border-slate-500 bg-slate-50 dark:bg-slate-700 shadow-[0px_2px_6px_rgba(0,0,0,0.10)] cursor-pointer
        transition-all duration-300

        hover:items-center
        hover:justify-center"
        onClick={handleOnClick}>
        
            <div className="
            flex flex-col items-center justify-center w-16 h-16 
            rounded-full bg-slate-100 dark:bg-slate-600
            transition-all duration-300
            
            group-hover:w-29
            group-hover:h-29">
                <Icon/>
            </div>

            <div className="pl-0.5 group-hover:hidden transition-all duration-200">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{info.title}</p>
                <p className="text-md text-slate-500 dark:text-slate-400">{info.content}</p>
            </div>
        </div>      
    )
};