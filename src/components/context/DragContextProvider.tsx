import {createContext, useContext, useState} from "react";

type DraggingContext={
   is_dragging:boolean
   id:string
   dragging_type: "button"|"element"|null
}


type DraggingContextType = {
    dragging_context:DraggingContext
    SetDraggingContext: (dragging_context:DraggingContext) => void
}

const initial_dragging_context: DraggingContextType = {
    dragging_context:{
        is_dragging: false,
        id:"",
        dragging_type: null
    },
    SetDraggingContext: () => null
}

export const DraggingContext = createContext<DraggingContextType>(initial_dragging_context);

interface IDragProviderProps {
    children: any
}

export function DragContextProvider(props: IDragProviderProps) {
    const [dragging_context, SetDraggingContext] = useState<DraggingContext>(initial_dragging_context.dragging_context)


    return <DraggingContext.Provider value={{dragging_context,SetDraggingContext }}>
        {props.children}
    </DraggingContext.Provider>

}

export function useDragging() {
    const context = useContext(DraggingContext)
    if (context === undefined) {
        throw new Error('useDragging must be used within a DragContextProvider')
    }
    return context
}
