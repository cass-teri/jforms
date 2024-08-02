import {IAst} from "@/types/IAst.tsx";

export function FindById(ast: IAst, id?: string | undefined | null): IAst | null {
    if (id === null || id === undefined) return null

    if (ast.id === id) {
        return ast
    }

    if (ast.children !== undefined && ast.children.length > 0) {
        for (let i = 0; i < ast.children.length; i++) {
            const result = FindById(ast.children[i], id)
            if (result) {
                return result
            }
        }
    }

    return null

}
