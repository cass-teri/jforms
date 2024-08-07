import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Input} from "@/components/ui/input.tsx";
import {Labelable} from "@jsonforms/core";

export function HeaderProperties() {
    const [header, SetHeader] = useState("")
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        const ui_schema = node?.SchemaPackage.ui_schema as Labelable

        if (ui_schema) {
            console.log(ui_schema)
            SetHeader(ui_schema.label ?? "")
        }
    }, [ast, selected]);

    function OnChange(e: any) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema as Labelable

        schema.label = e.target.value


        if (node) {
            console.log(schema)
            //schema = e.target.value
        }
        SetHeader(e.target.value)
        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>Header</h4>
        <hr/>
        <label className="flex flex-row items-center">
            <span className="pr-4">Header: </span>
            <Input type="text" onChange={(e) => OnChange(e)} value={header}/>
        </label>
    </div>


}
