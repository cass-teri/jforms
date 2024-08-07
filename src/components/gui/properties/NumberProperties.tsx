import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Input} from "@/components/ui/input.tsx";

export function NumberProperties() {
    const [min, SetMin] = useState(-8675309)
    const [max, SetMax] = useState(-8675309)
    const [exclusive_min, ExclusiveMin] = useState(-8675309)
    const [exclusive_max, ExclusiveMax] = useState(-8675309)
    const [multiple_of, MultipleOf] = useState(-8675309)
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const data_schema = node?.SchemaPackage.data_schema[node.id]
        if (data_schema) {
            console.log(data_schema)

            SetMin(data_schema.minimum ?? -1)
            SetMax(data_schema.maximum ?? -1)
            ExclusiveMin(data_schema.exclusiveMinimum ?? -1)
            ExclusiveMax(data_schema.exclusiveMaximum ?? -1)
            MultipleOf(data_schema.multipleOf ?? -1)
        }
    }, [ast, selected]);

    function OnChange(e: any, name: string) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.data_schema[node.id]

        switch (name) {
            case "min":
                if (node) {
                    schema.minimum = Number.parseFloat(e.target.value)
                }
                SetMin(e.target.value)
                break
            case "max":
                if (node) {
                    schema.maximum = Number.parseFloat(e.target.value)
                }
                SetMax(e.target.value)
                break
            case "exclusiveMinimum":
                if (node) {
                    schema.exclusiveMinimum = Number.parseFloat(e.target.value)
                }
                ExclusiveMin(e.target.value)
                break
            case "exclusiveMaximum":
                if (node) {
                    schema.exclusiveMaximum = Number.parseFloat(e.target.value)
                }
                ExclusiveMax(e.target.value)
                break
            case "multipleOf":
                if (node) {
                    schema.multipleOf = Number.parseFloat(e.target.value)
                }
                MultipleOf(e.target.value)
                break
        }

        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
        <h4>Number</h4>
        <hr/>
        <label className="flex flex-row items-center">
            <span className="pr-4">MultipleOf: </span>
            <Input type="number" onChange={(e) => OnChange(e, "multipleOf")} value={multiple_of}/>
        </label>

        <div className="flex flex-row">
            <label className="flex w-1/2 items-center">
                <span className="pr-4">Min: </span>
                <Input type="number" onChange={(e) => OnChange(e, "minimum")} value={min}/>
            </label>
            <label className="flex w-1/2 items-center">
                <span className="pr-4">Max: </span>
                <Input type="number" onChange={(e) => OnChange(e, "maximum")} value={max}/>
            </label>
        </div>

        <div className="flex flex-row">
            <label className="flex w-1/2 items-center">
                <span className="flex text-nowrap pr-4">Excl. Min: </span>
                <Input type="number" onChange={(e) => OnChange(e, "exclusiveMinimum")}
                       value={exclusive_min}/>
            </label>
            <label className="flex w-1/2 items-center">
                <span className="flex text-nowrap pr-4">Excl. Max: </span>
                <Input type="number" onChange={(e) => OnChange(e, "exclusiveMaximum")}
                       value={exclusive_max}/>
            </label>
        </div>
    </div>

}
