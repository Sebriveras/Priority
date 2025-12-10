import { IconButton } from "../../Microcomponents/IconButton";
import { DonationCard } from "./DonataionCard";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

export const DonationPopUp = ({ onClose }) => {
    return (
        <div
        className="
        fixed inset-0 z-50
        bg-black/60 dark:bg-black/25 backdrop-blur-sm 
        flex items-center justify-center
        animate-[fadeIn_.25s_ease]
        "
        onClick={onClose}>

            {/* Contenido */}
            <div
            className="
            flex flex-col
            p-6 gap-6
            rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg dark:border dark:border-slate-500
            min-w-[280px] max-w-[40%]
            relative
            animate-[popup_.25s_ease]
            "
                onClick={(e) => e.stopPropagation()}>
                
                <div className="flex flex-row justify-between">
                    <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400"> Support Priority with a Donation </p>
                    <IconButton
                    icon={'cancel'}
                    type={'default'}
                    onButtonClick={onClose}/>
                </div>


                {/* DESCRIPCION */}
                <p className="text-slate-700 dark:text-slate-200"> Priority is built by one person, and your support directly helps me improve and maintain the app. </p>

                {/* DONATION OPTIONS */}
                <div className="flex flex-col gap-2.5 text-sm text-slate-400 dark:text-slate-300">
                    <p className="text-slate-500"> Here are some options to support the project: </p>

                    <div className="
                    flex flex-col gap-2
                    
                    sm:flex-col
                    md:flex-col
                    lg:flex-col
                    xl:flex-col
                    2xl:flex-row">
                        <DonationCard type={'paypal'} />
                        <DonationCard type={'kofi'} />
                        <DonationCard type={'BMAC'} />
                    </div>
                </div>

                {/* NEXT FEATURE */}
                <div className="
                    flex flex-row items-center justify-start 
                    px-5 py-2 gap-1 
                    rounded-full bg-purple-100 dark:bg-purple-400/25
                ">
                    <p className="font-medium text-purple-600 dark:text-purple-100">Next Feature</p>
                    <ArrowRightOutlinedIcon className="text-purple-600 dark:text-purple-100" />
                    <p className="text-purple-600 dark:text-purple-100"> Feedback button </p>
                </div>
            </div>
        </div>
    );
};
