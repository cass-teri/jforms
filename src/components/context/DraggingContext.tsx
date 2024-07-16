import  {createContext, ReactNode, useContext, useState} from "react";

type DraggingContextType = {
    isDragging: boolean
    setIsDragging: (isDragging: boolean) => void
    currentDraggedComponent: string
    setCurrentDraggedComponent: (currentDraggedComponent: string) => void
}

const initialState: DraggingContextType = {
    isDragging: false,
    setIsDragging: () => null,
    currentDraggedComponent: "",
    setCurrentDraggedComponent: () => null
}

export const DraggingContext = createContext<DraggingContextType>(initialState)

export function DraggingProvider({children}: {children: ReactNode}) {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [currentDraggedComponent, setCurrentDraggedComponent] = useState<string>("")

    return (
        <DraggingContext.Provider value={{isDragging, setIsDragging, currentDraggedComponent, setCurrentDraggedComponent}}>
            {children}
        </DraggingContext.Provider>
    )
}


export function useDragging() {
    return useContext(DraggingContext)
}
