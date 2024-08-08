import {DropZone} from "@/components/editor/DropZone.tsx"
import {PiSquareSplitHorizontal} from "react-icons/pi"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {IAst} from "@/types/IAst.tsx"
import {GetComponentForName} from "@/lib/GetComponentForName.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion"

interface IHorizontalComponentProps {
    id: string
    ast: IAst
    parent?: IAst
    debug?: boolean
}

export function HorizontalComponent(props: IHorizontalComponentProps) {
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
                layout
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className={cn("m-1 w-full bg-neutral-300 text-neutral-800 flex flex-col clear-both overflow-visible hover:shadow-2xl rounded ring-amber-300 p-2", props.id == selected ? "ring-4" : "", props.ast.parent == undefined ? "m-0" : "m-1", props.ast.parent == undefined ? "m-0" : "m-1")}
            >
                <div className="flex flex-row justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <PiSquareSplitHorizontal/>
                        Horizontal
                    </span>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                </div>
                <div className="">
                    {children?.map((child: IAst, index: number) => {
                        return GetComponentForName(child.type, {
                            ast: child,
                            id: child.id,
                            key: index,
                            parent: props.ast
                        })
                    })}
                </div>
                <DropZone child_of={props.id} always_open={props.ast.parent === undefined}></DropZone>
            </motion.div>
        </>
    )
}
