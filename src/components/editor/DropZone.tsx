import { useState } from "react"
import { cn } from "@/lib/utils.ts"
import { motion } from "framer-motion"
import { GetComponentForName } from "@/lib/GetComponentForName.tsx"
import { FaPlus } from "react-icons/fa6"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { SchemasForName } from "@/lib/SchemasForName.ts"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { createId } from "@paralleldrive/cuid2"
import { FindById } from "@/lib/FindById.ts"

interface IDropZoneProps {
    before?: string
    child_of?: string
}

export function DropZone(props: IDropZoneProps) {
    const { dragging_context, SetDraggingContext } = useDragging()
    const [is_dragging_over, SetIsDraggingOver] = useState(false)
    const { ast, SetAst } = useAst()

    const OnDragOver = () => {
        SetIsDraggingOver(true)
    }

    const OnDragLeave = () => {
        SetIsDraggingOver(false)
    }

    const OnDrop = () => {
        SetDraggingContext({
            is_dragging: false,
            id: "",
            dragging_type: null
        })
        const dragging_id = dragging_context.id

        console.log("Dropping", dragging_id, "before", props.before, "child_of", props.child_of)

        // if we are dragging a button, create the item and add it to the AST
        // if we are dragging an element, move the element in the AST

        if (dragging_context.dragging_type === "button") {
            const component_schemas = SchemasForName(dragging_id)

            const id = createId()

            const parent_id = (props.before ? props.before : props.child_of) ?? null

            const parent = FindById(ast, parent_id)

            const new_node: IAst = {
                SchemaPackage: component_schemas,
                children: [],
                id: id,
                type: dragging_id,
                parent
            }

            if (props.before) {
                const index = FindById(ast, props.before)
                if (index === null) {
                    throw new Error("Element not found")
                }
                const parent = index.parent
                const index_of = parent?.children.findIndex((child) => child.id === props.before)

                if (index_of === 0) {
                    parent?.children.unshift(new_node)
                } else if (index_of && index_of != -1) {
                    parent?.children.splice(index_of, 0, new_node)
                } else {
                    parent?.children.push(new_node)
                }
            } else if (props.child_of) {
                parent?.children.push(new_node)
            }

            SetAst(ast)
        }
        if (dragging_context.dragging_type === "element") {
            const element = FindById(ast, dragging_context.id)
            if (element === null) {
                throw new Error("Element not found")
            }
            if (props.before) {
                const old_parent: IAst | null | undefined = element.parent

                const sibling = FindById(ast, props.before)
                const parent = sibling?.parent
                const index = parent?.children.findIndex((child) => child.id === props.before)

                const new_element = { ...element }

                if (old_parent == null) {
                    throw new Error("Element not found")
                }

                old_parent.children = old_parent?.children.filter((ast) => ast.id != element?.id)

                if (index == undefined) {
                    throw new Error("Element not found")
                }

                if (index === -1) {
                    throw new Error("Element not found")
                } else {
                    new_element.parent = parent
                    parent?.children.splice(index, 0, new_element)
                }
            } else if (props.child_of) {
                const old_parent = element.parent
                const parent = FindById(ast, props.child_of)
                const new_element = { ...element }

                if (
                    old_parent === null ||
                    old_parent == undefined ||
                    element.parent === null ||
                    element.parent === undefined ||
                    element.parent?.children === null
                ) {
                    throw new Error("Element not found")
                }

                old_parent.children = old_parent?.children.filter((child) => child.id !== element.id) || []
                new_element.parent = parent
                parent?.children.push(new_element)
            }

            SetAst(ast)
        }
    }

    let height = "h-0"
    if (dragging_context.is_dragging) {
        height = "h-2"

        if (is_dragging_over) {
            height = "h-24"
        }
    }

    return (
        <motion.div
            layout
            className="w-full"
            data-before={props.before}
            data-child-of={props.child_of}
            style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
        >
            {ast.children.length > 0
                ? ast.children.map((child, index) => (
                      <div key={index}>{GetComponentForName(child.id, { ast: child, id: child.id })}</div>
                  ))
                : null}
            <div
                className={cn("w-full flex justify-center items-center rounded-xl clear-both", height)}
                onDragOver={OnDragOver}
                onDragLeave={OnDragLeave}
                onDrop={OnDrop}
            >
                {dragging_context.is_dragging && is_dragging_over ? <FaPlus></FaPlus> : null}
            </div>
        </motion.div>
    )
}
