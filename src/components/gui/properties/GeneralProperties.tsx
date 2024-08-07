import {useEffect, useState} from "react";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Input} from "@/components/ui/input.tsx";

export function GeneralProperties() {
    const [type, SetType] = useState("")
    const [format, SetFormat] = useState("")
    const [title, SetTitle] = useState("")
    const [default_value, SetDefaultValue] = useState("")
    const [description, SetDescription] = useState("")
    const {ast, SetAst} = useAst()
    const {selected} = useSelection()

    useEffect(() => {
        const node = FindById(ast, selected)

        // @ts-expect-error possibly null or undefined
        const data_schema = node?.SchemaPackage.data_schema[node.id]
        if (data_schema) {
            SetType((Array.isArray(data_schema.type) ? data_schema.type[0] : data_schema.type) as string)
            SetFormat(data_schema.format ?? "")
            SetTitle(data_schema.title ?? "")
            SetDefaultValue(data_schema.default ?? "")
            SetDescription(data_schema.description ?? "")
        }
    }, [ast, selected]);

    function OnChange(e: any, name: string) {

        const node = FindById(ast, selected)
        // @ts-expect-error possibly null or undefined
        const schema = node.SchemaPackage.data_schema[node.id]

        switch (name) {
            case "type":
                if (node) {
                    schema.type = e.target.value
                }
                SetType(e.target.value)
                break
            case "format":
                if (node) {
                    schema.format = e.target.value
                }
                SetFormat(e.target.value)
                break
            case "title":
                if (node) {
                    schema.title = e.target.value
                }
                SetTitle(e.target.value)
                break
            case "default":
                if (node) {
                    schema.default = e.target.value
                }
                SetDefaultValue(e.target.value)
                break
            case "description":
                if (node) {
                    schema.description = e.target.value
                }
                SetDescription(e.target.value)
                break
        }

        SetAst(ast)

    }

    return <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-1 w-full">
        <h4>General</h4>
        <hr/>
        <div className="flex flex-row">
            <label className="flex flex-row items-center w-1/2">
                <span className="pr-4">Type: </span>
                <select className="w-full" onChange={(e) => OnChange(e, "type")} value={type}>
                    <option></option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                    <option value="integer">Integer</option>
                </select>
            </label>
            <label className="flex flex-row items-center pl-6 w-1/2">
                <span className="pr-4">Format: </span>
                <select className="w-full" onChange={(e) => OnChange(e, "format")} value={format}>
                    <option></option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="date-time">Date/Time</option>
                </select>
            </label>
        </div>
        <label className="flex items-center">
            <span className="pr-4">Title: </span>
            <Input type="text" tabIndex={-1} onChange={(e) => OnChange(e, "title")} value={title}/>
        </label>
        <label className="flex items-center">
            <span className="pr-4">Default: </span>
            <Input type="text" onChange={(e) => OnChange(e, "default")} value={default_value}/>
        </label>
        <label className="flex items-center">
            <span className="pr-4">Description: </span>
            <Input type="text" onChange={(e) => OnChange(e, "description")} value={description}/>
        </label>
    </div>
}
