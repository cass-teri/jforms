import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { AiOutlineGroup } from "react-icons/ai"
import { IAst } from "@/types/IAst.tsx"
import { GetComponentForName } from "@/lib/GetComponentForName.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"

export interface IGroupComponentProps {
    id: string
    ast: IAst
    parent?: IAst
}

export function GroupComponent(props: IGroupComponentProps) {
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

    let children: IAst[] = []
    if (props.ast.children !== null && props.ast.children !== undefined) {
        children = props.ast.children
    }

    return (
        <>
            <DropZone before={props.id}></DropZone>
            <div
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className="w-full bg-neutral-100 dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300"
            >
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <AiOutlineGroup />
                        Group
                    </div>
                    <div>id={props.id}</div>
                </div>

                <div className="overflow-visible clear-both">
                    <div className="clear-both">
                        {children.map((child: IAst, index: number) => {
                            return GetComponentForName(child.type, { ast: child, id: child.id, key: index })
                        })}
                    </div>
                    <DropZone child_of={props.id}></DropZone>
                </div>
            </div>
        </>
    )
}
