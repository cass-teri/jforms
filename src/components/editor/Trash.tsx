import {FaTrash} from "react-icons/fa6";

export function Trash(ITrashProps: ITrashProps) {

    return <div className="z-50 flex justify-center items-center w-16 h-16 bg-neutral-700 fixed right-0 bottom-0">
        <FaTrash className="text-neutral-400 w-8 h-8"/>
    </div>


}
