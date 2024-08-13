import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { cn } from "@/lib/utils.ts"
import { motion } from "framer-motion"
import { ImParagraphLeft } from "react-icons/im"
import { PiListBulletsBold } from "react-icons/pi"
import { MdHelpCenter } from "react-icons/md"

interface IHelpComponentProps {
    id: string
    name?: string
    type: string
    parent: IAst
    debug?: boolean
}

export function HelpComponent(props: IHelpComponentProps) {
    const { SetDraggingContext } = useDragging()
    const { selected, SetSelected } = useSelection()

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

    let icon = <h1 className="text-2xl font-extrabold text-neutral-400">H</h1>
    switch (props.type) {
        case "Header": {
            icon = <h1 className="text-2xl font-extrabold text-neutral-400">h</h1>
            break
        }
        case "SubHeader": {
            icon = <h2 className="text-xl font-bold text-neutral-400">H</h2>
            break
        }
        case "Paragraph": {
            icon = <ImParagraphLeft className="text-neutral-400" />
            break
        }
        case "Bullets": {
            icon = <PiListBulletsBold className="text-neutral-400" />
            break
        }
        case "Help Content": {
            icon = <MdHelpCenter className="text-neutral-400" />
            break
        }
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
                className={cn(
                    "m-1 hover:shadow-2xl px-4 py-2 ring-amber-300 shadow-inner flex flex-col rounded-b bg-neutral-50 ",
                    props.id == selected ? "ring-4" : ""
                )}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden pr-4">
                    <div></div>
                    <span className="flex flex-row items-center pr-4">{props.type}</span>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                    {icon}
                </div>
                <label> {props.name}</label>
            </motion.div>
        </>
    )
}
