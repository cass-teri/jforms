import {createContext, useContext, useState} from "react";
import {IAst} from "@/types/IAst.tsx";

type AstContextProvider = {
    ast: IAst
    SetAst: (ast: IAst) => void
}

const initial_ast: AstContextProvider = {
    ast: {} as IAst,
    SetAst: () => null
}

export const AstContext = createContext<AstContextProvider>(initial_ast);

interface IAstContextProviderProps {
    children: any
}

export function AstContextProvider(props: IAstContextProviderProps) {
    const [ast, SetAst] = useState<IAst>(initial_ast.ast)

    return <AstContext.Provider value={{ast,  SetAst}}>
        {props.children}
    </AstContext.Provider>
}

export function useAst() {
    const context = useContext(AstContext)
    if (context === undefined) {
        throw new Error('useAst must be used within a AstContextProvider')
    }
    return context
}
