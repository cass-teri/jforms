import {useEffect, useState} from "react";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {FindById} from "@/lib/FindById.ts";

export function CategorizationProperties() {
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    const [variant, SetVariant] = useState<"stepper"|"tabs">("stepper")

    useEffect(() => {
        const node = FindById(ast, selected)
        if (node) {
            // @ts-expect-error FIXME: Object is possibly 'null'.
            if (node.SchemaPackage.ui_schema && node.SchemaPackage.ui_schema.options && node.SchemaPackage.ui_schema.options.variant){
                // @ts-expect-error FIXME: Object is possibly 'null'.
                SetVariant(node.SchemaPackage.ui_schema.options.variant)
            }
        }
    }, [ast, selected]);

    function OnVariantChange(e: any) {
        SetVariant(e.target.value)
        const node = FindById(ast, selected)
        if (node) {
            // @ts-expect-error FIXME: Object is possibly 'null'.
            node.SchemaPackage.ui_schema.options.variant = e.target.value
            SetAst({...ast})
        }
    }

    return <div>
        <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-1 w-full">
            <h4>Layout Properties</h4>
            <hr/>
            <label className="flex items-center">
                <label className="pr-4">Label</label>

                <select value={variant} onChange={OnVariantChange}>
                    <option value="stepper">Stepper</option>
                    <option value="tabs">Tabs</option>
                </select>

            </label>

        </div>
    </div>
}
