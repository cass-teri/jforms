import {createRef, useEffect, useState} from "react";
import {LuMinimize2} from "react-icons/lu";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/input.tsx";
import {useSelection} from "@/components/context/SelectionContext.tsx";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {FindById} from "@/lib/FindById.ts";
import {Button} from "@/components/ui/button.tsx";
import {GetSchemasForName} from "@/lib/GetSchemasForName.ts";


export function PropertiesPanel() {
    const [minimize, setMinimize] = useState(true)
    const {selected} = useSelection()

    const {ast, SetAst} = useAst()

    const id_ref = createRef<HTMLInputElement>()

    const [type, SetType] = useState("")
    const [format, SetFormat] = useState("")
    const [title, SetTitle] = useState("")
    const [default_value, SetDefaultValue] = useState("")
    const [description, SetDescription] = useState("")

    const [min, SetMin] = useState(-8675309)
    const [max, SetMax] = useState(-8675309)
    const [exclusive_min, ExclusiveMin] = useState(-8675309)
    const [exclusive_max, ExclusiveMax] = useState(-8675309)

    const [min_length, MinLength] = useState(-8675309)
    const [max_length, MaxLength] = useState(-8675309)
    const [pattern, Pattern] = useState("")
    const [multiple_of, MultipleOf] = useState(-8675309)

    useEffect(() => {
        const node = FindById(ast, selected)
        if (id_ref.current) {
            id_ref.current.value = node?.id ?? ""
        }

        // @ts-expect-error possibly null or undefined
        const data_schema = node?.SchemaPackage.data_schema[node.id]
        if (data_schema) {
            console.log(data_schema)

            SetType((Array.isArray(data_schema.type) ? data_schema.type[0] : data_schema.type) as string)
            SetFormat(data_schema.format ?? "")
            SetTitle(data_schema.title ?? "")
            SetDefaultValue(data_schema.default ?? "")
            SetDescription(data_schema.description ?? "")
            SetMin(data_schema.minimum ?? -1)
            SetMax(data_schema.maximum ?? -1)
            ExclusiveMin(data_schema.exclusiveMinimum ?? -1)
            ExclusiveMax(data_schema.exclusiveMaximum ?? -1)
            MinLength(data_schema.minLength ?? -1)
            MaxLength(data_schema.maxLength ?? -1)
            Pattern(data_schema.pattern ?? "")
            MultipleOf(data_schema.multipleOf ?? -1)
        }
    }, [ast, id_ref, selected]);


    /*
        const minimize_icon = minimize ? (
        ) : (
            <LuMaximize2 className="text-foreground"/>
        )
    */

    function Minimize() {
        setMinimize(!minimize)
        SetType("")
        SetFormat("")
        SetTitle("")
        SetDefaultValue("")
        SetDescription("")
        SetMin(-1)
        SetMax(-1)
        ExclusiveMin(-1)
        ExclusiveMax(-1)
        MinLength(-1)
        MaxLength(-1)
        Pattern("")
        MultipleOf(-1)
    }

    function OnChangeId() {
        console.log("OnChangeId")

        const node = FindById(ast, selected)

        if (node) {
            const old_id = node.id
            const old_schema = node.SchemaPackage.data_schema[old_id]


            const new_id = id_ref.current?.value.replace(" ", "_") ?? ""
            const new_schema = GetSchemasForName(node.type, new_id)

            new_schema.data_schema[`${new_id}`] = old_schema

            node.SchemaPackage = new_schema
            node.id = new_id
        }
        SetAst(ast)

    }

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
            case "multipleOf":
                if (node) {
                    schema.multipleOf = Number.parseFloat(e.target.value)
                }
                MultipleOf(e.target.value)
                break
        }

        SetAst(ast)

    }

    return (
        <motion.aside
            className={`fixed top-16 right-0 bottom-16 bg-background text-foreground z-50 p-4 shadow-2xl ${minimize ? "w-14" : "w-2/5"}`}
            layout
            layoutId="properties-panel"
        >
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between w-full">
                    {minimize ? null : <span className="text-2xl">Properties</span>}
                    <button className="text-white bg-neutral-800 w-8 h-8 flex items-center justify-center rounded-xl "
                            onClick={Minimize}>
                        <LuMinimize2 className="text-foreground text-neutral-200 font-bold h-6 w-6"/>
                    </button>
                </div>

                {minimize ? null : <form>
                    <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 w-full">
                        <label className="flex flex-row items-center w-full">
                            <span>Id: </span>
                            <div className="flex flex-row justify-between items-center w-full">
                                <Input className="w-full" type="text" ref={id_ref}/>
                                <Button type="button" onClick={OnChangeId}>Change</Button>
                            </div>

                        </label>
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
                            <span>Title: </span>
                            <Input type="text" tabIndex={-1} onChange={(e) => OnChange(e, "title")} value={title}/>
                        </label>
                        <label className="flex items-center">
                            <span>Default: </span>
                            <Input type="text" onChange={(e) => OnChange(e, "default")} value={default_value}/>
                        </label>
                        <label className="flex items-center">
                            <span>Description: </span>
                            <Input type="text" onChange={(e) => OnChange(e, "description")} value={description}/>
                        </label>
                    </div>

                    <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
                        <h4>String</h4>
                        <hr/>
                        <div className="flex flex-row">
                            <label className="flex flex-row w-1/2 items-center">
                                <span className="text-nowrap">Min Length: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "minLength")} value={min_length}/>
                            </label>
                            <label className="flex flex-row w-1/2 items-center">
                                <span className="text-nowrap">Max Length: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "maxLength")} value={max_length}/>
                            </label>
                        </div>
                        <label className="flex flex-row items-center">
                            <span>Pattern: </span>
                            <Input type="text" onChange={(e) => OnChange(e, "pattern")} value={pattern}/>
                        </label>
                    </div>

                    <div className="px-4 py-2 border border-neutral-200 rounded flex flex-col gap-4 mt-4">
                        <h4>Number</h4>
                        <hr/>
                        <label className="flex flex-row items-center">
                            <span>MultipleOf: </span>
                            <Input type="number" onChange={(e) => OnChange(e, "multipleOf")} value={multiple_of}/>
                        </label>


                        <div className="flex flex-row">
                            <label className="flex w-1/2 items-center">
                                <span>Min: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "minimum")} value={min}/>
                            </label>
                            <label className="flex w-1/2 items-center">
                                <span>Max: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "maximum")} value={max}/>
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <label className="flex w-1/2 items-center">
                                <span className="flex text-nowrap">Excl. Min: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "exclusiveMinimum")}
                                       value={exclusive_min}/>
                            </label>
                            <label className="flex w-1/2 items-center">
                                <span className="flex text-nowrap">Excl. Max: </span>
                                <Input type="number" onChange={(e) => OnChange(e, "exclusiveMaximum")}
                                       value={exclusive_max}/>
                            </label>
                        </div>
                    </div>
                </form>}


            </div>
        </motion.aside>
    )
}
