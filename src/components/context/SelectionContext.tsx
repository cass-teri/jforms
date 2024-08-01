import { createContext, ReactNode, useContext, useState } from "react"

type SelectionContextType = {
    selected: string
    SetSelected: (selected: string) => void
}
const initialSelectionContext: SelectionContextType = {
    selected: "",
    SetSelected: () => {}
}

const SelectionContext = createContext<SelectionContextType>(initialSelectionContext)

interface ISelectionProviderProps {
    children: ReactNode
}

export function SelectionProvider(props: ISelectionProviderProps) {
    const [selected, setSelected] = useState<string>("")
    return (
        <SelectionContext.Provider value={{ selected, SetSelected: setSelected }}>
            {props.children}
        </SelectionContext.Provider>
    )
}

export function useSelection() {
    const context = useContext(SelectionContext)

    if (context === undefined) {
        throw new Error("useSelection must be used within a SelectionProvider")
    }

    return context
}
