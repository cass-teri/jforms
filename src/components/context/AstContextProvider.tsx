import { createContext, useContext, useState } from "react"
import { IAst } from "@/types/IAst.tsx"
import { ReparentAst } from "@/components/context/ReparentAst.tsx"
import {GenerateDataSchema} from "@/lib/GenerateDataSchema.ts";
import {GenerateUiSchema} from "@/lib/GenerateUiSchema.ts";

type AstContextProvider = {
    ast: IAst
    SetAst: (ast: IAst) => void
    data_schema: any
    ui_schema: any
}

const initial_ast: AstContextProvider = {
    ast: {} as IAst,
    SetAst: () => null,
    data_schema: {},
    ui_schema: {},
}

export const AstContext = createContext<AstContextProvider>(initial_ast)

interface IAstContextProviderProps {
    children: any
}

export function AstContextProvider(props: IAstContextProviderProps) {
    const [data_schema, SetDataSchemaInner] = useState<any>({})
    const [ui_schema, SetUiSchemaInner] = useState<any>({})

    const [ast, SetAstInner] = useState<IAst>(() => {
        const local = localStorage.getItem("ast")
        if (!local) return {} as IAst
        return ReparentAst(JSON.parse(local) as IAst)
    })

    function SetDataSchema(ast: IAst) {
        const data_schema = GenerateDataSchema(ast)
        SetDataSchemaInner(data_schema)
    }

    function SetUiSchema(ast: any) {
        const ui_schema = GenerateUiSchema(ast)
        SetUiSchemaInner(ui_schema)
    }

    function SetAst(ast: IAst) {
        SetAstInner(ast)
        SetDataSchema(ast)
        SetUiSchema(ast)

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

    return <AstContext.Provider value={{ ast, SetAst, data_schema, ui_schema }}>{props.children}</AstContext.Provider>
}

export function useAst() {
    const context = useContext(AstContext)
    if (context === undefined) {
        throw new Error("useAst must be used within a AstContextProvider")
    }
    return context
}
