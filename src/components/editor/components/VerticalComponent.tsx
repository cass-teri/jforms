import {DropZone} from "@/components/editor/DropZone.tsx";
import {PiSquareSplitVertical} from "react-icons/pi";
import {IContainerNode} from "@/components/editor/components/INode.tsx";
import {ContainerComponent} from "@/components/editor/components/ContainerComponent.ts";

export class VerticalComponent extends ContainerComponent implements IContainerNode {

    render() {
        return <div draggable tabIndex={0}
                    className="w-full bg-secondary dark:bg-neutral-500 flex flex-col border-2 clear-both overflow-visible  p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">

            <div className="flex flex-row">
                <PiSquareSplitVertical className="h-8 w-8 clear-both pb-2"/>
                Vertical
            </div>

            <div className="px-16 bg-green-50 overflow-visible clear-both">
                <div className="clear-both">
                    {this.children.map((child, index) => {
                        return <div key={index}>{child}</div>
                    })}</div>
                <DropZone></DropZone>
            </div>
        </div>
    }
}
