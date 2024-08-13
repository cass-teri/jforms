import { useEffect, useState } from "react"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { FindById } from "@/lib/FindById.ts"
import { HelpContent } from "@/types/HelpContent.tsx"
import { Input } from "@/components/ui/input"

export function HelpContentProperties() {
    const [paragraph, SetParagraph] = useState("")
    const [header, SetHeader] = useState("")
    const [sub_header, SetSubHeader] = useState("")

    const { ast, SetAst } = useAst()
    const { selected } = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        const ui_schema = node?.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.options && ui_schema.options.help) {
            // @ts-expect-error possibly null or undefined
            SetParagraph(ui_schema.options.help ?? "")
        }

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.label) {
            // @ts-expect-error possibly null or undefined
            SetHeader(ui_schema.label ?? "")
        }

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.elements && ui_schema.elements[0].label) {
            // @ts-expect-error possibly null or undefined
            const sub_header = ui_schema.elements[0].label
            if (sub_header) {
                SetSubHeader(sub_header ?? "")
            }
        }
    }, [ast, selected])

    function OnChangeParagraph(e: any) {
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

    function OnChangeHeader(e: any) {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema as HelpContent

        // @ts-expect-error possibly null or undefined
        schema.label = e.target.value

        if (node) {
            console.log(schema)
        }
        SetHeader(e.target.value)
        SetAst(ast)
    }

    function OnChangeSubHeader(e: any) {
        console.log(e.target.value)
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema as HelpContent

        if (schema) {
            // @ts-expect-error possibly null or undefined
            if (!schema.elements) {
                // @ts-expect-error possibly null or undefined
                schema.elements = [{ label: "" }]
            }
            // @ts-expect-error possibly null or undefined

            schema.elements[0].label = e.target.value
        }

        if (node) {
            console.log(schema)
        }
        SetSubHeader(e.target.value)
        SetAst(ast)
    }

    return (
        <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
            <h4>HelpContent</h4>
            <hr />
            <label className="flex flex-row items-center">
                <span className="pr-4">Header: </span>
                <Input type="text" value={header} onChange={OnChangeHeader} />
            </label>

            <label className="flex flex-row items-center">
                <span className="pr-4">SubHeader: </span>
                <Input type="text" value={sub_header} onChange={OnChangeSubHeader} />
            </label>
            <label className="flex flex-row items-center">
                <textarea
                    className="w-full p-2 border border-neutral-200 rounded"
                    rows={40}
                    onChange={(e) => OnChangeParagraph(e)}
                    value={paragraph}
                />
            </label>
        </div>
    )
}
