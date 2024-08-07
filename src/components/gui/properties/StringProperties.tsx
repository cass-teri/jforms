import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Input} from "@/components/ui/input.tsx";

export function StringProperties() {
    const [min_length, MinLength] = useState(-8675309)
    const [max_length, MaxLength] = useState(-8675309)
    const [pattern, Pattern] = useState("")
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        // @ts-expect-error possibly null or undefined
        const data_schema = node?.SchemaPackage.data_schema[node.id]
        if (data_schema) {
            MinLength(data_schema.minLength ?? -1)
            MaxLength(data_schema.maxLength ?? -1)
            Pattern(data_schema.pattern ?? "")
        }
    }, [ast, selected]);

    function OnChange(e: any, name: string) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.data_schema[node.id]

        switch (name) {
            case "minLength":
                if (node) {
                    schema.minLength = Number.parseInt(e.target.value)
                }
                MinLength(e.target.value)
                break
            case "maxLength":
                if (node) {
                    schema.maxLength = Number.parseInt(e.target.value)
                }
                MaxLength(e.target.value)
                break
            case "pattern":
                if (node) {
                    schema.pattern = e.target.value
                }
                Pattern(e.target.value)
                break
        }

        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>String</h4>
        <hr/>
        <div className="flex flex-row">
            <label className="flex flex-row w-1/2 items-center">
                <span className="text-nowrap pr-4">Min Length: </span>
                <Input type="number" onChange={(e) => OnChange(e, "minLength")} value={min_length}/>
            </label>
            <label className="flex flex-row w-1/2 items-center">
                <span className="text-nowrap pr-4">Max Length: </span>
                <Input type="number" onChange={(e) => OnChange(e, "maxLength")} value={max_length}/>
            </label>
        </div>
        <label className="flex flex-row items-center">
            <span className="pr-4">Pattern: </span>
            <Input type="text" onChange={(e) => OnChange(e, "pattern")} value={pattern}/>
        </label>
    </div>


}
