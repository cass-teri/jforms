import {DropZone} from "@/components/editor/DropZone.tsx"
import {PiSquareSplitHorizontal} from "react-icons/pi"
import {useDragging} from "@/components/context/DragContextProvider.tsx"
import {IAst} from "@/types/IAst.tsx"
import {GetComponentForName} from "@/lib/GetComponentForName.tsx"
import {useSelection} from "@/components/context/SelectionContext.tsx"

interface IHorizontalComponentProps {
    id: string
    ast: IAst
    parent?: IAst
}

export function HorizontalComponent(props: IHorizontalComponentProps) {
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
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className="w-full bg-neutral-50 dark:bg-neutral-500 border-neutral-400 flex flex-col border-2 clear-both overflow-visible p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300"
            >
                <div className="flex flex-row justify-between overflow-hidden">
                    <span className="flex flex-row items-center pr-4">
                        <PiSquareSplitHorizontal/>
                        Horizontal
                    </span>
                    <span className="text-neutral-200">id={props.id}</span>
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
                <DropZone child_of={props.id}></DropZone>
            </div>
        </>
    )
}
