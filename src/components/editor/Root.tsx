import React, { ReactNode, useState } from "react"
import { cn } from "@/lib/utils.ts"
import { GetComponentForName } from "@/lib/GetComponentForName.tsx"
import { GetSchemasForName } from "@/lib/GetSchemasForName.ts"
import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { createId } from "@paralleldrive/cuid2"

export function Root() {
    const [is_dragging, SetIsDragging] = useState(false)
    const [root, SetRoot] = useState<ReactNode | null>(null)
    const { dragging_context, SetDraggingContext } = useDragging()
    const { ast, SetAst} = useAst()

    if (ast !== null && (root === undefined || root === null)) {
        if (ast.id !== undefined) {
            const component = GetComponentForName(ast.type, { ast, id: ast.id })
            SetRoot(component)
        }
    }

    const OnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        SetIsDragging(true)
    }

    const OnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        SetIsDragging(false)
    }

    const OnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        SetIsDragging(false)
        const id = createId()
        const dragging_id = dragging_context.id
        const component_schemas = GetSchemasForName(dragging_id, id)

        if (root !== null) {
            return root
        }

        const new_ast = {
            id,
            SchemaPackage: component_schemas,
            children: [],
            type: dragging_id
        }
        SetAst(new_ast)

        const component = GetComponentForName(dragging_id, { id, ast: new_ast })

        SetRoot(component)
        SetDraggingContext({
            is_dragging: false,
            id: "",
            dragging_type: null
        })
    }

    return (
        <div className={cn("flex flex-col justify-start items-start w-full pb-96 overflow-auto h-[calc(100vh-2rem)]")}>
            <div
                className={cn("w-full bg-accent mt-8 ", root ? "h-[calc(100vh-3rem)]" : (is_dragging ? "h-32" : "h-16"))}
                style={{
                    backgroundColor: "#ffffff",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
                onDragOver={OnDragOver}
                onDragLeave={OnDragLeave}
                onDrop={OnDrop}
            >
                {root ? (
                    root
                ) : (
                    <p className="text-accent-foreground rounded bg-white ">Drop Layout Component Here</p>
                )}
            </div>
        </div>
    )
}
