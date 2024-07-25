import {LuTextCursorInput} from "react-icons/lu";
import {DropZone} from "@/components/editor/DropZone.tsx";

interface ITextComponentProps {
    id: string
    name?: string
}

export function TextComponent (props: ITextComponentProps) {
    return <>
        <DropZone></DropZone>
        <div draggable tabIndex={0} className="h-16 border-2 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col bg-white rounded-xl border-neutral-400">
            <div className="flex flex-row items-center bg-neutral-400">
                <LuTextCursorInput className=""/>
                Text
            </div>
            <label> {props.name}</label>
            <div className="border-gray-300 bg-gray-200">id={props.id}</div>
        </div>
    </>
}
