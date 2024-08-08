import {DropZone} from "@/components/editor/DropZone.tsx"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {IAst} from "@/types/IAst.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion";

interface IHelpComponentProps {
    id: string
    name?: string
    type: string
    parent: IAst
    debug?: boolean
}

export function HelpComponent(props: IHelpComponentProps) {
    const {SetDraggingContext} = useDragging()
    const {selected, SetSelected} = useSelection()


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
            <motion.div
                layout
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className={cn("my-1 bg-neutral-50 text-neutral-800 hover:shadow-2xl px-4 py-2 ring-amber-300 shadow-inner flex flex-col rounded border-neutral-200", props.id == selected ? "ring-4" : "")}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <span className="text-2xl font-extrabold">T</span>
                        {props.type}
                    </span>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                </div>
                <label> {props.name}</label>
            </motion.div>
        </>
    )
}
