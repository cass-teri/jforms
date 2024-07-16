import {DropZone} from "@/components/editor/DropZone.tsx";
import {PiSquareSplitVertical} from "react-icons/pi";
import {Component, ReactNode} from "react";

interface INode {
    children: ReactNode[]
}

export class VerticalComponent extends Component implements INode{
    children: ReactNode[] = []

    render() {
        return <div draggable className="w-full bg-secondary dark:bg-neutral-500 flex flex-col border-2 clear-both overflow-visible p-2">

            <div className="">
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
