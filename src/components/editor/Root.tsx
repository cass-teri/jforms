import React, {ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {ComponentForName} from "@/lib/ComponentForName.tsx";
import {SchemasForName} from "@/lib/SchemasForName.tsx";
import {useDragging} from "@/components/context/DragContextProvider.tsx";


export function Root() {
    const [is_dragging, SetIsDragging] = useState(false)
    const [root, SetRoot] = useState<ReactNode | null>(null)
    const {dragging_context, SetDraggingContext} = useDragging()

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
        const data = dragging_context.id
        const component_schemas = SchemasForName(data)
        const component  =ComponentForName(data)

        if(root == null) {
            SetRoot(component)
        }

        SetDraggingContext({
            is_dragging: false,
            id: "",
            dragging_type: null
        })
    }

    return <div className="flex flex-col justify-center items-start">
        <div className={cn("w-full bg-accent mt-16", is_dragging?"h-32":"h-16")}
                style={{
                    backgroundColor: "#ffffff",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            onDragOver={OnDragOver}
            onDragLeave={OnDragLeave}
            onDrop={OnDrop}
        >
            {root?root:<p className="text-accent-foreground rounded bg-white py-2 px-4 ">Drop Layout Component Here</p>}
        </div>
    </div>
}
