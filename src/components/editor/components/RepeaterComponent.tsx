import {DropZone} from "@/components/editor/DropZone.tsx";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {FaLayerGroup} from "react-icons/fa6";
import {IAst} from "@/types/IAst.tsx";
import {ComponentForName} from "@/lib/ComponentForName.tsx";

interface IRepeaterComponentProps {
    id: string
    ast: IAst
    parent?: IAst
}

export function RepeaterComponent (props: IRepeaterComponentProps) {
    const {SetDraggingContext}= useDragging()

    function OnDragStart() {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
    }

    let children : IAst[] = []
    if(props.ast !== null && props.ast.children !== null) {
        children = props.ast.children
    }

    return <>
        <DropZone before={props.id}></DropZone>
        <div draggable
             onDragStart={OnDragStart}
             tabIndex={0}
             className="w-full bg-neutral-300 dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">

            <div className="flex flex-row justify-between">
                <span className="flex flex-row items-center">
                <FaLayerGroup/>
                Repeater
                </span>
                <span>
                    id={props.id}
                </span>
            </div>

            <div className="bg-green-50 overflow-visible clear-both">
                <div className="clear-both">
                    {children?.map((child: IAst, index:number) => {
                        return  ComponentForName(child.type, {ast:child,id:child.id, key:index, parent:props.ast })
                    })}</div>
                <DropZone child_of={props.id}></DropZone>
            </div>
        </div>
    </>
}
