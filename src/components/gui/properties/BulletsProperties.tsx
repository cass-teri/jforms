import { useEffect, useRef, useState } from "react"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { FindById } from "@/lib/FindById"
import { Input } from "@/components/ui/input.tsx"

export function BulletProperties() {
    const [bullets, SetEnums] = useState([])
    const { ast, SetAst } = useAst()
    const { selected } = useSelection()
    const bullet_list_ref = useRef<HTMLSelectElement>(null)
    const new_bullet_ref = useRef<HTMLInputElement>(null)

    /*
        const ui_schema: HelpContent = {
            type: "HelpContent",
            elements: [
                {
                    type: "HelpContent",
                    label: "",
                    options: {
                        help: ["one", "two", "three"]
                    }
                }
            ]
        }
    */
    useEffect(() => {
        const node = FindById(ast, selected)

        const ui_schema = node?.SchemaPackage.ui_schema

        // @ts-expect-error possibly null or undefined
        if (ui_schema && ui_schema.elements && ui_schema.elements[0] && ui_schema.elements[0].options) {
            // @ts-expect-error possibly null or undefined
            if (ui_schema.elements[0].options.help) {
                // @ts-expect-error possibly null or undefined
                SetEnums(ui_schema.elements[0].options.help ?? [])
            }
        } else {
            SetEnums([])
        }
    }, [ast, selected])

    function OnRemoveEnum() {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema

        const selected_option = bullet_list_ref.current?.selectedOptions[0]
        // @ts-expect-error possibly null or undefined
        if (schema.elements[0].options.help) {
            // @ts-expect-error possibly null or undefined
            schema.elements[0].options.help = schema.elements[0].options.help.filter(
                (e: any) => e !== selected_option?.value
            )
        }

        const filtered = bullets.filter((e: any) => e !== selected_option?.value)
        SetEnums(filtered)

        SetAst(ast)
    }

    function OnAddEnum() {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.ui_schema
        const new_value = new_bullet_ref.current?.value
        new_bullet_ref.current!.value = ""

        // @ts-expect-error possibly null or undefined
        if (!schema.elements[0].options.help) {
            // @ts-expect-error possibly null or undefined
            schema.elements[0].options.help = []
        }
        // @ts-expect-error possibly null or undefined
        schema.elements[0].options.help.push(new_value)

        SetAst(ast)
    }

    return (
        <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
            <h4>Bullets</h4>
            <hr />
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <Input type="text" className="w-full" ref={new_bullet_ref}></Input>
                    <button
                        onClick={OnAddEnum}
                        className="bg-neutral-600 text-neutral-50 w-8 h-8 rounded-l border-r"
                        type="button"
                    >
                        +
                    </button>
                    <button
                        onClick={OnRemoveEnum}
                        className="bg-neutral-600 text-neutral-50 w-8 h-8 rounded-r"
                        type="button"
                    >
                        -
                    </button>
                </div>
                <select size={10} ref={bullet_list_ref} className="border-2 border-neutral-300">
                    {bullets.map((e: any) => {
                        return (
                            <option key={e} value={e} className="flex flex-row justify-between">
                                {" "}
                                {e}{" "}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
