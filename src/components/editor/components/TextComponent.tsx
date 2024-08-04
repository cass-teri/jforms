import {LuTextCursorInput} from "react-icons/lu"
import {DropZone} from "@/components/editor/DropZone.tsx"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {ToDisplayString} from "@/lib/ToTitleCase.ts";
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion"

interface ITextComponentProps {
    id: string
    name?: string
    type: string
}
export function TextComponent(props: ITextComponentProps) {
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
                className={cn("bg-white m-1 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded ", props.id == selected? "ring-4": "")}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden">
                    <span className="text-neutral-800 ">{ToDisplayString(props.id)}</span>
                    <span className="text-neutral-500 flex flex-row items-center pr-4">
                        <LuTextCursorInput className=""/>
                        {props.type}
                    </span>
                </div>
            </motion.div>
        </>
    )
}
