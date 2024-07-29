import {DropZone} from "@/components/editor/DropZone.tsx";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {RiDropdownList} from "react-icons/ri";
import {IAst} from "@/types/IAst.tsx";

interface IChoiceComponentProps {
    id: string,
    name?: string,
    type: string,
    parent: IAst
}

export function ChoiceComponent(props: IChoiceComponentProps) {

    const {SetDraggingContext} = useDragging()

    function OnDragStart() {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
    }

    return <>
        <DropZone before={props.id}></DropZone>
        <div
            onDragStart={OnDragStart}
            draggable
            tabIndex={0}
            className="bg-sky-100 border-2 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded-xl border-neutral-400">
            <div className="flex flex-row items-center border-b-neutral-400 justify-between">
                <div className="flex flex-row items-center">
                    <RiDropdownList className="" />
                    <span className="align-bottom">{props.type}</span>
                </div>
                <div>id={props.id}</div>
            </div>
            <label> {props.name}</label>
            <div className="border-neutral-400 border rounded-b bg-white px-4 py-2"></div>
        </div>
    </>
}
