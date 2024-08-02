import {LuTextCursorInput} from "react-icons/lu"
import {DropZone} from "@/components/editor/DropZone.tsx"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"

interface ITextComponentProps {
    id: string
    name?: string
    type: string
}

export function TextComponent(props: ITextComponentProps) {
    const {SetDraggingContext} = useDragging()
    const {SetSelected} = useSelection()

    function OnClick(e: any) {
        e.stopPropagation()
        SetSelected(props.id)
    }

    function OnDragStart(e: any) {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
        e.stopPropagation()
    }

    return (
        <>
            <DropZone before={props.id}></DropZone>
            <div
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className="bg-red-100 border-2 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded border-neutral-400"
            >
                <div className="flex flex-row items-center border-b-neutral-400 justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <LuTextCursorInput className=""/>
                        {props.type}
                    </span>
                    <span>id={props.id}</span>
                </div>
                <label> {props.name}</label>
            </div>
        </>
    )
}
