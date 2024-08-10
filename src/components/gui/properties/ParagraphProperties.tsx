import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {HelpContent} from "@/types/HelpContent.tsx";

export function ParagraphProperties() {
    const [paragraph, SetParagraph] = useState("")
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        const ui_schema = node?.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.options && ui_schema.options.help) {

            // @ts-expect-error possibly null or undefined
            SetParagraph(ui_schema.options.help ?? "")
        }
    }, [ast, selected]);

    function OnChange(e: any) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        schema.options.help = e.target.value


        if (node) {
            console.log(schema)
            //schema = e.target.value
        }
        SetParagraph(e.target.value)
        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>Paragraph</h4>
        <hr/>
        <label className="flex flex-row items-center">
            <textarea
                className="w-full p-2 border border-neutral-200 rounded"
                rows={40}
                onChange={(e) => OnChange(e)} value={paragraph}/>
        </label>
    </div>


}
