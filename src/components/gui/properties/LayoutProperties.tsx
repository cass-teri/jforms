import {useEffect, useState} from "react";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {FindById} from "@/lib/FindById.ts";

export function LayoutProperties() {
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()
    const [label, SetLabel] = useState("")

    useEffect(() => {
        const node = FindById(ast, selected)
        if (node) {
            // @ts-expect-error FIXME: Object is possibly 'null'.
            SetLabel(node.SchemaPackage.ui_schema.label)
        }
    }, [ast, selected]);

    function OnLabelChange(e: any) {
        SetLabel(e.target.value)
        const node = FindById(ast, selected)
        if (node) {
            // @ts-expect-error FIXME: Object is possibly 'null'.
            node.SchemaPackage.ui_schema.label = e.target.value
            SetAst({...ast})
        }
    }

    return <div>
        <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-1 w-full">
            <h4>Layout Properties</h4>
            <hr/>
            <label className="flex items-center">
                <label className="pr-4">Label</label>
                <input type="text" value={label} onChange={OnLabelChange} />
            </label>

        </div>
    </div>
}
