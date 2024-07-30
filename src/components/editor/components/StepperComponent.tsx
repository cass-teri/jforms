import {DropZone} from "@/components/editor/DropZone.tsx";
import {ReactNode} from "react";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {PiStepsBold} from "react-icons/pi";

interface IStepperComponentProps {
    id: string
    children?: ReactNode[]
}

export function StepperComponent (props: IStepperComponentProps) {
    const {SetDraggingContext}= useDragging()

    function OnDragStart(e:any) {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
        e.stopPropagation()
    }

    return <>
        <DropZone before={props.id}></DropZone>
        <div draggable
             onDragStart={OnDragStart}
             tabIndex={0}
             className="w-full bg-neutral-200 dark:bg-neutral-500 flex flex-col border-2 border-neutral-400 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">

            <div className="flex flex-row justify-between items-center">
                <span className="flex flex-row items-center ">
                <PiStepsBold />
                Stepper
                </span>
                <span>
                    id={props.id}
                </span>
            </div>

            <div className="overflow-visible clear-both">
                <div className="clear-both">
                    {props.children?.map((child: ReactNode, index:number) => {
                        return <div key={index}>{child}</div>
                    })}</div>
                <DropZone child_of={props.id}></DropZone>
            </div>
        </div>
    </>
}
