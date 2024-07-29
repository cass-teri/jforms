import React, {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion";
import {ComponentForName} from "@/lib/ComponentForName.tsx";
import {FaPlus} from "react-icons/fa6";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {SchemasForName} from "@/lib/SchemasForName.ts";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {IAst} from "@/types/IAst.tsx";
import {createId} from "@paralleldrive/cuid2";
import {FindById} from "@/lib/FindById.ts";


interface IDropZoneProps {
    before?: string
    child_of?: string
}

export function DropZone(props: IDropZoneProps) {
    const [is_dragging, SetIsDragging] = useState(false)
    const {dragging_context} = useDragging()
    const {ast, SetAst} = useAst()

    const OnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        SetIsDragging(true)
    }

    const OnDragLeave = () => {
        SetIsDragging(false)
    }

    const OnDrop = () => {
        SetIsDragging(false)
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
                const index = FindById(ast,  props.before)
                if (index === null) {
                    throw new Error("Element not found")
                }
                const parent = index.parent
                const index_of = parent?.children.findIndex((child) => child.id === props.before)

                if (index_of === 0) {
                    parent?.children.unshift(new_node)
                }
                else if (index_of && index_of != -1){
                    parent?.children.splice(index_of, 0, new_node)
                }
                else {
                    parent?.children.push(new_node)
                }


            } else if (props.child_of) {
                parent?.children.push(new_node)
            }

            SetAst(ast)

        }
        if (dragging_context.dragging_type === "element") {
            const element = FindById(ast, dragging_context.id)
            if (element === null){
                throw new Error("Element not found")
            }
            if (props.before) {
                const parent = FindById(ast, props.before)
                const index = parent?.children.findIndex((child) => child.id === props.before)


                if(index === -1) {
                    parent?.children.splice(index, 0, element)
                }
                else {
                    if (index) parent?.children.splice(index, 0, element)
                }



            } else if (props.child_of) {
                const parent = FindById(ast, props.child_of)
                element.parent = parent
                parent?.children.push(element)
            }

            SetAst(ast)

        }


    }

    return <motion.div layout className="w-full"
                       style={{
                           backgroundColor: "#ffffff",
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                       }}>
        { ast.children.length > 0 ?
            ast.children.map((child, index) =>
                <div key={index}>{ComponentForName(child.id, {ast:child, id:child.id})}</div>)
                : null
        }
        <div
            className={cn("w-full flex justify-center items-center rounded-xl clear-both", is_dragging ? "h-24" : "h-6")}
            onDragOver={OnDragOver}
            onDragLeave={OnDragLeave}
            onDrop={OnDrop}
        >
            <FaPlus></FaPlus>
        </div>
    </motion.div>
}
