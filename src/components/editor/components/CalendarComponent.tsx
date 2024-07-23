import {ElementComponent} from "@/components/editor/components/ElementComponent.ts";
import {INode} from "@/components/editor/components/INode.tsx";


export class CalendarComponent extends ElementComponent implements INode {
    render() {
        return <div draggable tabIndex={0} className="h-16 rounded-xl hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300">
            Calendar
        </div>
    }
}
