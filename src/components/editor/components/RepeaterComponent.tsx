import {DropZone} from "@/components/editor/DropZone.tsx"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {FaLayerGroup} from "react-icons/fa6"
import {IAst} from "@/types/IAst.tsx"
import {GetComponentForName} from "@/lib/GetComponentForName.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"

interface IRepeaterComponentProps {
    id: string
    ast: IAst
    parent?: IAst
}

export function RepeaterComponent(props: IRepeaterComponentProps) {
    const {SetDraggingContext} = useDragging()
    const {SetSelected} = useSelection()

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
            <div
                draggable
                onDragStart={OnDragStart}
                onClick={OnClick}
                tabIndex={0}
                className="w-full bg-neutral-300 dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300"
            >
                <div className="flex flex-row justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <FaLayerGroup/>
                        Repeater
                    </span>
                    <span className="text-neutral-200">id={props.id}</span>
                </div>

                <div className="bg-green-50 overflow-visible clear-both">
                    <div className="clear-both">
                        {children?.map((child: IAst, index: number) => {
                            return GetComponentForName(child.type, {
                                ast: child,
                                id: child.id,
                                key: index,
                                parent: props.ast
                            })
                        })}
                    </div>
                    <DropZone child_of={props.id}></DropZone>
                </div>
            </div>
        </>
    )
}
