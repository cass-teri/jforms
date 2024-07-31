import { IAst } from "@/types/IAst.tsx"

export function ReparentAst(ast: IAst) {
    if (ast.children === undefined) {
        return ast
    }
    for (const child_ast of ast.children) {
        child_ast.parent = ast
        ReparentAst(child_ast)
    }
    return ast
}
