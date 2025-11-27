import { useEffect, useState } from 'react';

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import PendingIcon from '@mui/icons-material/Pending';

export const Switch = ({ mode, externalMode }) => {
    // state será "pending" o "check", nunca booleano
    const [state, setState] = useState("pending");

    // sincrónico con el padre
    useEffect(() => {
        setState(externalMode);
    }, [externalMode]);

    const handleClick = () => {
        const newMode = state === "pending" ? "check" : "pending";
        setState(newMode);
        mode(newMode); // avisamos al padre
    };

    return (
        <div
            onClick={handleClick}
            className="
                flex flex-col items-center justify-center
                w-14 py-5 gap-4
                rounded-tr-xl rounded-br-xl
                border-t border-r border-b border-slate-300 
                bg-slate-100
                cursor-pointer select-none
            "
        >
            {/* PENDING ICON */}
            {state === "pending"
                ? <PendingIcon className="text-blue-600" />
                : <PendingOutlinedIcon className="text-slate-400" />
            }

            {/* CHECK ICON */}
            {state === "check"
                ? <CheckBoxIcon className="text-blue-600" />
                : <CheckBoxOutlinedIcon className="text-slate-400" />
            }
        </div>
    );
};
