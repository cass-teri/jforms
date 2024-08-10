import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Input} from "@/components/ui/input.tsx";
import {HelpContent} from "@/types/HelpContent.tsx";

export function SubHeaderProperties() {
    const [sub_header, SetSubHeader] = useState("")
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        const ui_schema = node?.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.elements && ui_schema.elements[0].label) {
            // @ts-expect-error possibly null or undefined
            const sub_header = ui_schema.elements[0].label
            if (sub_header) {
                SetSubHeader(sub_header ?? "")
            }
        }

    }, [ast, selected]);

    function OnChange(e: any) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        schema.elements[0].label = e.target.value

        if (node) {
            console.log(schema)
            //schema = e.target.value
        }
        SetSubHeader(e.target.value)
        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>SubHeader</h4>
        <hr/>
        <label className="flex flex-row items-center">
            <span className="pr-4">SubHeader: </span>
            <Input type="text" onChange={(e) => OnChange(e)} value={sub_header}/>
        </label>
    </div>


}
