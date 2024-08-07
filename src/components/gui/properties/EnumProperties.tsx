import {useEffect, useRef, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById";
import {Input} from "@/components/ui/input.tsx";

export function EnumProperties() {
    const [enums, SetEnums] = useState([])
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()
    const enum_list_ref = useRef<HTMLSelectElement>(null)
    const new_enum_ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const data_schema = node?.SchemaPackage.data_schema[node.id]
        if (data_schema) {
            SetEnums(data_schema.enum ?? [])
        } else {
            SetEnums([])
        }
    }, [ast, selected]);


    function OnRemoveEnum() {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.data_schema[node.id]

        const selected_option = enum_list_ref.current?.selectedOptions[0]
        schema.enum = schema.enum.filter((e: any) => e !== selected_option?.value)
        const filtered = enums.filter((e: any) => e !== selected_option?.value)
        SetEnums(filtered)

        SetAst(ast)

    }

    function OnAddEnum() {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.data_schema[node.id]
        const new_value = new_enum_ref.current?.value
        new_enum_ref.current!.value = ""

        if (!schema.enum) {
            schema.enum = []
        }
        schema.enum.push(new_value)

        SetAst(ast)
    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>Enums</h4>
        <hr/>
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <Input type="text" className="w-full" ref={new_enum_ref}></Input>
                <button onClick={OnAddEnum}
                        className="bg-neutral-600 text-neutral-50 w-8 h-8 rounded-l border-r"
                        type="button">+
                </button>
                <button onClick={OnRemoveEnum}
                        className="bg-neutral-600 text-neutral-50 w-8 h-8 rounded-r"
                        type="button">-
                </button>
            </div>
            <select size={10} ref={enum_list_ref} className="border-2 border-neutral-300">
                {
                    enums.map((e: any) => {
                        return <option key={e} value={e} className="flex flex-row justify-between"> {e} </option>
                    })
                }
            </select>
        </div>
    </div>


}
