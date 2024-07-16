import React, {ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion";
import {ComponentForName} from "@/lib/ComponentForName.tsx";


export function DropZone() {
    const [is_dragging, SetIsDragging] = useState(false)
    const [children, SetChildren] = useState<ReactNode[]>([])

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
        SetChildren([...children, component])
    }

    return <motion.div layout className="w-full " >
        {
            children.length>0?children.map((child, index) =>
                    <div key={index}>{child}</div>) :
                    null}
            <div

                         className={cn("w-full flex justify-center items-center bg-accent rounded-xl clear-both", is_dragging?"h-32":"h-16")}
                         onDragOver={OnDragOver}
                         onDragLeave={OnDragLeave}
                         onDrop={OnDrop}

            >Drop Component Here</div>


    </motion.div>
}
