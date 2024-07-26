import {DropZone} from "@/components/editor/DropZone.tsx";
import {PiSquareSplitVertical} from "react-icons/pi";
import {ReactNode} from "react";
import {useDragging} from "@/components/context/DragContextProvider.tsx";

interface IVerticalComponentProps {
    id: string
    children?: ReactNode[]
}

export function VerticalComponent (props: IVerticalComponentProps) {
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
        <div draggable
             onDragStart={OnDragStart}
             tabIndex={0}
             className="w-full bg-secondary dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">

            <div className="flex flex-row">
                <PiSquareSplitVertical className="h-8 w-8 clear-both pb-2"/>
                Vertical
            </div>

            <div className="bg-green-50 overflow-visible clear-both">
                <div className="clear-both">
                    {props.children?.map((child: ReactNode, index:number) => {
                        return <div key={index}>{child}</div>
                    })}</div>
                <DropZone></DropZone>
            </div>
        </div>
    </>
}
