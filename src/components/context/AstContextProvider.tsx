import { createContext, useContext, useState } from "react"
import { IAst } from "@/types/IAst.tsx"
import { ReparentAst } from "@/components/context/ReparentAst.tsx"

type AstContextProvider = {
    ast: IAst
    SetAst: (ast: IAst) => void
}

const initial_ast: AstContextProvider = {
    ast: {} as IAst,
    SetAst: () => null
}

export const AstContext = createContext<AstContextProvider>(initial_ast)

interface IAstContextProviderProps {
    children: any
}

export function AstContextProvider(props: IAstContextProviderProps) {
    const [ast, SetAstInner] = useState<IAst>(() => {
        const local = localStorage.getItem("ast")
        if (!local) return {} as IAst
        const local_obj = JSON.parse(local) as IAst
        const reparented = ReparentAst(local_obj)
        console.log(reparented)
        return reparented as IAst
    })

    function SetAst(ast: IAst) {
        SetAstInner(ast)
        localStorage.setItem(
            "ast",
            JSON.stringify(ast, (key, value) => {
                if (key == "parent") {
                    return value.id
                }
                return value
            })
        )
    }

    return <AstContext.Provider value={{ ast, SetAst }}>{props.children}</AstContext.Provider>
}

export function useAst() {
    const context = useContext(AstContext)
    if (context === undefined) {
        throw new Error("useAst must be used within a AstContextProvider")
    }
    return context
}
