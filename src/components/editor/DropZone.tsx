import React, {ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {motion} from "framer-motion";
import {ComponentForName} from "@/lib/ComponentForName.tsx";
import {FaPlus} from "react-icons/fa6";


export function DropZone() {
    const [is_dragging, SetIsDragging] = useState(false)
    const [children, SetChildren] = useState<ReactNode[]>([])

    function pauseEvent(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }

    const OnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        pauseEvent(e)
        SetIsDragging(true)
    }

    const OnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        pauseEvent(e)
        SetIsDragging(false)
    }

    const OnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        pauseEvent(e)
        SetIsDragging(false)
        const data = e.dataTransfer.getData("text")
        const component  =ComponentForName(data)
        SetChildren([...children, component])
    }

    return <motion.div layout className="w-full"
                       style={{
                           backgroundColor: "#ffffff",
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999999' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                       }}

    >
        {
            children.length>0?children.map((child, index) =>
                    <div key={index}>{child}</div>) :
                null}
        <div

            className={cn("w-full flex justify-center items-center rounded-xl clear-both", is_dragging?"h-24":"h-6")}
            onDragOver={OnDragOver}
            onDragLeave={OnDragLeave}
            onDrop={OnDrop}

        >
            <FaPlus></FaPlus>
        </div>


    </motion.div>
}
