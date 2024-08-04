import {DropZone} from "@/components/editor/DropZone.tsx"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {RiDropdownList} from "react-icons/ri"
import {IAst} from "@/types/IAst.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {ToDisplayString} from "@/lib/ToTitleCase.ts";
import {motion} from "framer-motion"
import {cn} from "@/lib/utils.ts";

interface IChoiceComponentProps {
    id: string
    name?: string
    type: string
    parent: IAst
}

export function ChoiceComponent(props: IChoiceComponentProps) {
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
                onDragStart={OnDragStart}
                layout
                onClick={OnClick}
                draggable
                tabIndex={0}
                className={cn("bg-white border hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-col rounded border-neutral-200 overflow-hidden", props.id == selected? "ring-4": "")}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden">
                    <span className="text-neutral-600">{ToDisplayString(props.id)}</span>
                    <div className="flex flex-row items-center pr-4 text-neutral-400">
                        <RiDropdownList className=""/>
                        <span className="align-bottom ">{props.type}</span>
                    </div>
                </div>
                <label> {props.name}</label>
            </motion.div>
        </>
    )
}
