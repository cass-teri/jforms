import { LuTextCursorInput } from "react-icons/lu"
import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { cn, ReplaceIllegalCharacters, ToDisplayString } from "@/lib/utils.ts"
import { motion } from "framer-motion"
import { FindById } from "@/lib/FindById.ts"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { GetSchemasForComponentType } from "@/lib/GetSchemasForComponentType.ts"
import { BsPostcard, BsTextareaResize } from "react-icons/bs"
import { FaRegCalendarAlt } from "react-icons/fa"
import { PiNumberSquareOneLight, PiPhoneDisconnect } from "react-icons/pi"
import { TbDecimal } from "react-icons/tb"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { useState } from "react"

interface ITextComponentProps {
    id: string
    name?: string
    type: string
}

export function TextComponent(props: ITextComponentProps) {
    const { SetDraggingContext } = useDragging()
    const { selected, SetSelected } = useSelection()
    const { ast, SetAst } = useAst()
    const [error, SetError] = useState("")

    function OnClick(e: any) {
        e.stopPropagation()
        SetSelected(props.id)
    }

    function OnDragStart(e: any) {
        SetDraggingContext({
            is_dragging: true,
            id: props.id,
            dragging_type: "element"
        })
        e.stopPropagation()
    }

    function OnBlur(e: any) {
        console.log(e.target.innerText)

        const new_id = ReplaceIllegalCharacters(e.target.innerText)

        const new_node = FindById(ast, new_id)
        if (new_node) {
            if (new_id === props.id) {
                return
            }
            SetError("This id already exists, id not changed")
            return
        }

        const node = FindById(ast, props.id)

        if (node) {
            const old_id = node.id
            // @ts-expect-error possibly null or undefined
            const old_schema = node.SchemaPackage.data_schema[old_id]

            const new_schema = GetSchemasForComponentType(node.type, new_id)

            // @ts-expect-error possibly null or undefined
            new_schema.data_schema[`${new_id}`] = old_schema

            node.SchemaPackage = new_schema
            node.id = new_id
        }
        SetAst(ast)
        SetError("")
    }

    let icon = <LuTextCursorInput className="text-neutral-400" />
    switch (props.type) {
        case "Text": {
            icon = <LuTextCursorInput className="text-neutral-400" />
            break
        }
        case "Textarea": {
            icon = <BsTextareaResize className="text-neutral-400" />
            break
        }
        case "Date": {
            icon = <FaRegCalendarAlt className="text-neutral-400" />
            break
        }
        case "Integer": {
            icon = <PiNumberSquareOneLight className="text-neutral-400" />
            break
        }
        case "Number": {
            icon = <TbDecimal className="text-neutral-400" />
            break
        }
        case "Postal Code": {
            icon = <BsPostcard className="text-neutral-400" />
            break
        }
        case "Phone": {
            icon = <PiPhoneDisconnect className="text-neutral-400" />
            break
        }
        case "Email": {
            icon = <MdOutlineAlternateEmail className="text-neutral-400" />
            break
        }
    }

    return (
        <>
            <DropZone before={props.id}></DropZone>
            <motion.div
                layout
                onDragStart={OnDragStart}
                onClick={OnClick}
                draggable
                tabIndex={0}
                className={cn(
                    "bg-white m-1 hover:shadow-2xl px-4 py-2 ring-amber-300 shadow-inner flex flex-col rounded ",
                    props.id == selected ? "ring-4" : ""
                )}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden">
                    <div
                        contentEditable
                        suppressContentEditableWarning={true}
                        onBlur={OnBlur}
                        className=" text-nowrap text-neutral-800 pr-2"
                    >
                        {ToDisplayString(props.id)}
                    </div>

                    <span className="text-neutral-500 flex flex-row items-center pr-4">{icon}</span>
                </div>
                {error ? <div className="text-red-700 font-bold">{error}</div> : null}
            </motion.div>
        </>
    )
}
