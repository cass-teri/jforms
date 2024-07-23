import {ElementComponent} from "@/components/editor/components/ElementComponent.ts";
import {INode} from "@/components/editor/components/INode.tsx";

export class TextComponent extends ElementComponent implements INode {

    render() {
        return <div draggable tabIndex={0} className="h-16 hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300 shadow-inner flex flex-row">
            Text: <div className="border-gray-300 bg-gray-200">id={this.id}</div>
        </div>
    }
}
