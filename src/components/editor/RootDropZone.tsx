import React, {ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {ComponentForName} from "@/lib/ComponentForName.tsx";


export function RootDropZone() {
    const [is_dragging, SetIsDragging] = useState(false)
    const [root, SetRoot] = useState<ReactNode | null>(null)

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
        const data = e.dataTransfer.getData("text")
        const component  =ComponentForName(data)
        if(root == null) {
            SetRoot(component)
        }

    }

    return <div className={cn("w-full flex justify-center items-start bg-accent mt-16", is_dragging?"h-32":"h-16")}
            onDragOver={OnDragOver}
            onDragLeave={OnDragLeave}
            onDrop={OnDrop}
        >
            {root?root:<p className="text-accent-foreground">Drop Layout Component Here</p>}
        </div>
}
