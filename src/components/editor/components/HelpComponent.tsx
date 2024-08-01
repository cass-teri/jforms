import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"

interface IHelpComponentProps {
    id: string
    name?: string
    type: string
    parent: IAst
}

export function HelpComponent(props: IHelpComponentProps) {
    const { SetDraggingContext } = useDragging()
    const { SetSelected } = useSelection()

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
                className="bg-violet-100 border-2 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded border-neutral-400"
            >
                <div className="flex flex-row items-center border-b-neutral-400 justify-between">
                    <span className="flex flex-row items-center">
                        <span className="text-2xl font-extrabold">T</span>
                        {props.type}
                    </span>
                    <span>id={props.id}</span>
                </div>
                <label> {props.name}</label>
            </div>
        </>
    )
}
