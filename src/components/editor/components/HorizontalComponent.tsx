import {DropZone} from "@/components/editor/DropZone.tsx";
import {PiSquareSplitHorizontal} from "react-icons/pi";
import {ContainerComponent} from "@/components/editor/components/ContainerComponent.ts";


export class HorizontalComponent extends ContainerComponent {


    render() {
        return <div
            draggable
            tabIndex={0}
            className="w-full bg-secondary dark:bg-neutral-500 flex flex-row border-2 clear-both overflow-visible p-2 hover:shadow-2xl rounded focus:ring-4 ring-amber-300">
            <div className="flex flex-row">
                <PiSquareSplitHorizontal className="h-8 w-8 clear-both"/>
                Horizontal
            </div>
            <div className="px-16 bg-orange-50 clear-both overflow-visible">
                <div className="flex flex-row">
                    {this.children.map((child, index) => {
                        return <div key={index}>{child}</div>
                    })}
                </div>
            </div>
            <DropZone></DropZone>
        </div>
    }
}
