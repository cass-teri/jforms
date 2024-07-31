import { DropZone } from "@/components/editor/DropZone.tsx"
import { PiSquareSplitVertical } from "react-icons/pi"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { GetComponentForName } from "@/lib/GetComponentForName.tsx"

interface IVerticalComponentProps {
    id: string
    ast: IAst
}

export function VerticalComponent(props: IVerticalComponentProps) {
    const { SetDraggingContext } = useDragging()

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
            <div
                draggable
                onDragStart={OnDragStart}
                tabIndex={0}
                className="w-full bg-white dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300"
            >
                <div className="flex flex-row justify-between">
                    <span className="flex flex-row items-center">
                        <PiSquareSplitVertical />
                        Vertical
                    </span>
                    <span>id={props.id}</span>
                </div>

                <div className="overflow-visible clear-both">
                    <div className="clear-both">
                        {children?.map((ast, index) => {
                            return GetComponentForName(ast.type, { ast, id: ast.id, key: index })
                        })}
                    </div>
                    <DropZone child_of={props.id}></DropZone>
                </div>
            </div>
        </>
    )
}
