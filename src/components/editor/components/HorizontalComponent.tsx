import {DropZone} from "@/components/editor/DropZone.tsx";
import {PiSquareSplitHorizontal} from "react-icons/pi";
import {ReactNode} from "react";
import {useDragging} from "@/components/context/DragContextProvider.tsx";

interface IHorizontalComponentProps {
    id: string
    children?: ReactNode[]
}

export function HorizontalComponent (props: IHorizontalComponentProps) {

    const {SetDraggingContext}= useDragging()

    function OnDragStart() {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
    }


    return <>
        <DropZone></DropZone>
        <div
            onDragStart={OnDragStart}
            draggable
            tabIndex={0}
            className="w-full bg-secondary dark:bg-neutral-500 border-neutral-400 flex flex-col border-2 clear-both overflow-visible p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">
            <div className="flex flex-row">
                <PiSquareSplitHorizontal className="h-8 w-8 clear-both"/>
                Horizontal
            </div>
            <div className="bg-orange-50 clear-both overflow-visible flex flex-row ">
                {props.children?.map((child:ReactNode, index:number) => {
                    return <div key={index}>{child}</div>
                })}
            </div>
            <DropZone></DropZone>
        </div>
    </>
}
