import {FaTrash} from "react-icons/fa6";
import {useState} from "react";
import {useDragging} from "@/components/context/DragContextProvider.tsx";
import {useAst} from "@/components/context/AstContextProvider.tsx";
import {FindById} from "@/lib/FindById.ts";

export function Trash() {
    const [Active, SetActive] = useState(false)
    const {dragging_context, SetDraggingContext} = useDragging();
    const {ast, SetAst} = useAst()

    function OnDragOver(event: any) {
        if (dragging_context.dragging_type === "element") {
            event.preventDefault()
            SetActive(true)
        }
    }

    function OnDragLeave(event: any) {
        if (dragging_context.dragging_type === "element") {
            event.preventDefault()
            SetActive(false)
        }
    }

    function OnDrop(event: any) {
        if (dragging_context.dragging_type === "element") {
            event.preventDefault()
            SetActive(false)
        }
        SetDraggingContext({
            is_dragging: false,
            id: "",
            dragging_type: null
        })

        const found = FindById(ast, dragging_context.id)
        if (found){
            const parent = found.parent
            if (parent) {
                parent.children = parent.children.filter((child) => {
                    return child.id !== dragging_context.id
                })
                SetAst({...ast})
            }
        }
    }

    return <div
        className={`z-50 flex justify-center items-center w-16 h-16 bg-neutral-700 fixed right-0 bottom-0
        ${Active ? 'bg-red-200' : 'bg-neutral-700'} 
        `}
        onDragOver={OnDragOver}
        onDragLeave={OnDragLeave}
        onDrop={OnDrop}
    >
        <FaTrash
            className={`text-neutral-400 w-8 h-8
        ${Active ? 'text-red-500' : 'text-neutral-400'}
        `}/>
    </div>


}
