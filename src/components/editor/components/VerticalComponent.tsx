import {DropZone} from "@/components/editor/DropZone.tsx"
import {PiSquareSplitVertical} from "react-icons/pi"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {IAst} from "@/types/IAst.tsx"
import {GetComponentForName} from "@/lib/GetComponentForName.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion"

interface IVerticalComponentProps {
    id: string
    ast: IAst
    debug?: boolean
}

export function VerticalComponent(props: IVerticalComponentProps) {
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

    let children: IAst[] = []
    if (props.ast !== null && props.ast.children !== null) {
        children = props.ast.children
    }

    return (
        <>
            <DropZone before={props.id}></DropZone>
            <motion.div
                draggable
                layout
                onDragStart={OnDragStart}
                onClick={OnClick}
                tabIndex={0}
                className={cn("my-1 w-full bg-neutral-200 text-neutral-800 flex flex-col clear-both overflow-visible  p-2 hover:shadow-2xl rounded ring-amber-300", props.id == selected ? "ring-4" : "", props.ast.parent === undefined ? "m-0" : "m-1")}

            >
                <div className="flex flex-row justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <PiSquareSplitVertical/>
                        Vertical
                    </span>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                </div>

                <div className="overflow-visible clear-both">
                    <div className="clear-both">
                        {children?.map((ast, index) => {
                            return GetComponentForName(ast.type, {ast, id: ast.id, key: index})
                        })}
                    </div>
                    <DropZone child_of={props.id} always_open={props.ast.parent === undefined}></DropZone>
                </div>
            </motion.div>
        </>
    )
}
