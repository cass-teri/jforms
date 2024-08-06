import {DropZone} from "@/components/editor/DropZone.tsx"
import {ReactNode} from "react"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {PiStepsBold} from "react-icons/pi"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion"
import {IAst} from "@/types/IAst.tsx";

interface IStepperComponentProps {
    id: string
    children?: ReactNode[]
    debug?: boolean
    ast: IAst
}

export function StepperComponent(props: IStepperComponentProps) {
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
                draggable
                onDragStart={OnDragStart}
                onClick={OnClick}
                tabIndex={0}
                className={cn("m-1 w-full bg-neutral-200 dark:bg-neutral-500 flex flex-col clear-both overflow-visible  p-2 hover:shadow-2xl rounded ring-amber-300", props.id == selected? "ring-4": "", props.ast.parent == undefined ? "m-0" : "m-1")}
            >
                <div className="flex flex-row justify-between items-center overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <PiStepsBold/>
                        Stepper
                    </span>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                </div>

                <div className="overflow-visible clear-both">
                    <div className="clear-both">
                        {props.children?.map((child: ReactNode, index: number) => {
                            return <div key={index}>{child}</div>
                        })}
                    </div>
                    <DropZone child_of={props.id}></DropZone>
                </div>
            </motion.div>
        </>
    )
}
