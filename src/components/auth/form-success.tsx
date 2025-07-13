import { BsCheckCircle } from "react-icons/bs";


export const FormSuccess = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 w-full p-3 rounded-[6px] flex items-center gap-x-2 text-sm text-emerald-500">
            <BsCheckCircle className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
