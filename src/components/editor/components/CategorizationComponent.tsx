import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { GetComponentForComponentType } from "@/lib/GetComponentForComponentType.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { cn } from "@/lib/utils.ts"
import { motion } from "framer-motion"
import { PiStepsBold } from "react-icons/pi"

export interface ICategorizationComponentProps {
    id: string
    ast: IAst
    parent?: IAst
    debug?: boolean
}

export function CategorizationComponent(props: ICategorizationComponentProps) {
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

    let children: IAst[] = []
    if (props.ast.children !== null && props.ast.children !== undefined) {
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
                className={cn(
                    "m-1 w-full bg-neutral-600 text-neutral-50 flex flex-col clear-both overflow-visible  p-2 hover:shadow-2xl rounded ring-amber-300",
                    props.id == selected ? "ring-4" : "",
                    props.ast.parent == undefined || false ? "m-0" : "m-1"
                )}
            >
                <div className="flex flex-row justify-between overflow-hidden">
                    <div className="flex flex-row items-center pr-4">
                        <PiStepsBold />
                        Categorization
                    </div>
                    {props.debug ? <span className="text-neutral-50">{props.id}</span> : null}
                </div>

                <div className="overflow-visible clear-both">
                    <div className="clear-both">
                        {children.map((child: IAst, index: number) => {
                            return GetComponentForComponentType(child.type, { ast: child, id: child.id, key: index })
                        })}
                    </div>
                    <DropZone child_of={props.id} always_open={props.ast.parent === undefined}></DropZone>
                </div>
            </motion.div>
        </>
    )
}
