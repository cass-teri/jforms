import { DropZone } from "@/components/editor/DropZone.tsx"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { RiDropdownList } from "react-icons/ri"
import { IAst } from "@/types/IAst.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { motion } from "framer-motion"
import { cn, ReplaceIllegalCharacters, ToDisplayString } from "@/lib/utils.ts"
import { FindById } from "@/lib/FindById.ts"
import { GetSchemasForComponentType } from "@/lib/GetSchemasForComponentType.ts"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { VscSymbolBoolean } from "react-icons/vsc"
import { IoMdRadioButtonOn } from "react-icons/io"
import { FaLandmark, FaRegSquareCheck } from "react-icons/fa6"
import { MdOutlineLandscape } from "react-icons/md"
import { useState } from "react"

interface IChoiceComponentProps {
    id: string
    name?: string
    type: string
    parent: IAst
}

export function ChoiceComponent(props: IChoiceComponentProps) {
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

    let icon = <RiDropdownList />
    switch (props.type) {
        case "Boolean": {
            icon = <VscSymbolBoolean />
            break
        }
        case "DropDown": {
            icon = <RiDropdownList />
            break
        }
        case "Radio": {
            icon = <IoMdRadioButtonOn />
            break
        }
        case "Checkbox": {
            icon = <FaRegSquareCheck />
            break
        }
        case "Province": {
            icon = <MdOutlineLandscape />
            break
        }
        case "Ministry": {
            icon = <FaLandmark />
            break
        }
    }

    return (
        <>
            <DropZone before={props.id}></DropZone>
            <motion.div
                onDragStart={OnDragStart}
                layout
                onClick={OnClick}
                draggable
                tabIndex={0}
                className={cn(
                    "m-1 bg-white border hover:shadow-2xl px-4 py-2 ring-amber-300 shadow-inner flex flex-col rounded border-neutral-200 overflow-hidden",
                    props.id == selected ? "ring-4" : ""
                )}
            >
                <div className="flex flex-row items-center justify-between overflow-hidden">
                    <span
                        contentEditable
                        suppressContentEditableWarning={true}
                        onBlur={OnBlur}
                        className="text-neutral-600"
                    >
                        {ToDisplayString(props.id)}
                    </span>
                    <div className="flex flex-row items-center pr-4 text-neutral-400">{icon}</div>
                </div>
                {error ? <div className="text-red-700 font-bold">{error}</div> : null}
            </motion.div>
        </>
    )
}
