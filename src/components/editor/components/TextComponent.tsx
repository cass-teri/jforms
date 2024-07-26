import {LuTextCursorInput} from "react-icons/lu";
import {DropZone} from "@/components/editor/DropZone.tsx";
import {useDragging} from "@/components/context/DragContextProvider.tsx";

interface ITextComponentProps {
    id: string,
    name?: string,
    type: string
}

export function TextComponent(props: ITextComponentProps) {

    const {SetDraggingContext} = useDragging()

    function OnDragStart() {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
    }

    return <>
        <DropZone></DropZone>
        <div
            onDragStart={OnDragStart}
            draggable
            tabIndex={0}
            className="bg-neutral-100 border-2 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded-xl border-neutral-400">
            <div className="flex flex-row items-center border-b-neutral-400">
                <LuTextCursorInput className=""/>
                {props.type}
            </div>
            <label> {props.name}</label>
            <div className="border-neutral-400 border rounded-b bg-white px-4 py-2">id={props.id}</div>
        </div>
    </>
}
