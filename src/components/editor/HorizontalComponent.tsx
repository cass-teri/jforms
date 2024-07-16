import {DropZone} from "@/components/editor/DropZone.tsx";
import {Component, ReactNode} from "react";
import {PiSquareSplitHorizontal} from "react-icons/pi";

export class HorizontalComponent extends Component {

    children: ReactNode[] = []

    render() {
        return <div
            draggable
            className="w-full bg-secondary dark:bg-neutral-500 flex flex-col border-2 clear-both overflow-visible p-2">
            <div className="flex flex-row">
                <PiSquareSplitHorizontal className="h-8 w-8 clear-both"/>
                Horizontal
            </div>
                <div className="px-16 bg-orange-50 clear-both">
                    <div className="clear-both">
                        {this.children.map((child, index) => {
                            return <div key={index}>{child}</div>
                        })}</div>
                </div>
            <DropZone></DropZone>
        </div>
    }
}
